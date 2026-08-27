import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useApolloClient, useLazyQuery, useMutation } from "@apollo/client";
import { LOGIN, YO } from "../api/queries";
import { tokenStorage } from "../api/tokenStorage";

const AuthContext = createContext(null);

/**
 * Sesión del repartidor: guarda el JWT en AsyncStorage y mantiene el
 * objeto `repartidor` en memoria. Envuelve toda la app (ver App.js) por
 * encima de OrdersProvider, ya que las queries de pedidos dependen de
 * haber iniciado sesión.
 */
export function AuthProvider({ children }) {
  const client = useApolloClient();
  const [repartidor, setRepartidor] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const [loginMutation, { loading: loggingIn }] = useMutation(LOGIN);
  const [fetchYo] = useLazyQuery(YO, { fetchPolicy: "network-only" });

  useEffect(() => {
    (async () => {
      const token = await tokenStorage.get();
      if (token) {
        try {
          const { data } = await fetchYo();
          if (data?.yo) setRepartidor(data.yo);
          else await tokenStorage.clear();
        } catch {
          await tokenStorage.clear();
        }
      }
      setInitializing(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(
    async (correo, password) => {
      const { data } = await loginMutation({ variables: { correo, password } });
      await tokenStorage.set(data.login.token);
      setRepartidor(data.login.repartidor);
      return data.login.repartidor;
    },
    [loginMutation]
  );

  const logout = useCallback(async () => {
    await tokenStorage.clear();
    setRepartidor(null);
    await client.clearStore();
  }, [client]);

  return (
    <AuthContext.Provider value={{ repartidor, setRepartidor, login, logout, loggingIn, initializing }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
