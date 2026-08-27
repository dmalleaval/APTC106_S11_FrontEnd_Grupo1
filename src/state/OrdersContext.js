import React, { createContext, useCallback, useContext, useMemo } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ACEPTAR_PEDIDO, PEDIDOS_DISPONIBLES, PEDIDOS_EN_CURSO } from "../api/queries";
import { useAuth } from "./AuthContext";

const OrdersContext = createContext(null);

/**
 * Antes: estado en memoria con arrays hardcodeados (AVAILABLE_SEED,
 * POR_RETIRAR_SEED). Ahora: los mismos datos vienen del backend GraphQL vía
 * las queries pedidosDisponibles / pedidosEnCurso, y "aceptar" dispara la
 * mutation aceptarPedido en vez de mover objetos entre arrays locales.
 *
 * "por retirar" / "en reparto" se derivan del campo `estado` que llega del
 * servidor (ver src/graphql/typeDefs.js en el backend, enum EstadoPedido).
 */
export function OrdersProvider({ children }) {
  const { repartidor } = useAuth();

  const {
    data: disponiblesData,
    loading: loadingDisponibles,
    refetch: refetchDisponibles,
  } = useQuery(PEDIDOS_DISPONIBLES, { skip: !repartidor });

  const {
    data: enCursoData,
    loading: loadingEnCurso,
    refetch: refetchEnCurso,
  } = useQuery(PEDIDOS_EN_CURSO, { skip: !repartidor, pollInterval: 15000 });

  const [aceptarPedidoMutation] = useMutation(ACEPTAR_PEDIDO);

  const available = disponiblesData?.pedidosDisponibles ?? [];
  const enCurso = enCursoData?.pedidosEnCurso ?? [];

  const porRetirar = useMemo(
    () => enCurso.filter((p) => p.estado === "ACEPTADO" || p.estado === "LLEGADA_LOCAL"),
    [enCurso]
  );
  const enReparto = useMemo(
    () => enCurso.filter((p) => p.estado === "RETIRADO" || p.estado === "EN_CAMINO_CLIENTE"),
    [enCurso]
  );

  const acceptOrder = useCallback(
    async (pedidoId) => {
      const { data } = await aceptarPedidoMutation({ variables: { pedidoId } });
      await Promise.all([refetchDisponibles(), refetchEnCurso()]);
      return data.aceptarPedido;
    },
    [aceptarPedidoMutation, refetchDisponibles, refetchEnCurso]
  );

  const refetchAll = useCallback(() => {
    return Promise.all([refetchDisponibles(), refetchEnCurso()]);
  }, [refetchDisponibles, refetchEnCurso]);

  return (
    <OrdersContext.Provider
      value={{
        available,
        porRetirar,
        enReparto,
        loading: loadingDisponibles || loadingEnCurso,
        acceptOrder,
        refetchAll,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders debe usarse dentro de <OrdersProvider>");
  return ctx;
}
