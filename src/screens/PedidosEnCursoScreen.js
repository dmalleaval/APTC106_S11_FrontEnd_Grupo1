import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../components/Card";
import AppButton from "../components/AppButton";
import Icon from "../components/Icon";
import { colors } from "../theme/colors";
import { fontBody } from "../theme/typography";
import { useOrders } from "../state/OrdersContext";

function formatCLP(n) {
  if (n == null) return "—";
  return `$${Math.round(n).toLocaleString("es-CL")}`;
}

// Progreso visual de la barra (coincide con los 5 pasos de
// ActualizarEstadoScreen.js: aceptado=0% ... entregado=100%)
const PROGRESO_POR_ESTADO = { RETIRADO: 55, EN_CAMINO_CLIENTE: 80 };

export default function PedidosEnCursoScreen({ navigation }) {
  const { porRetirar, enReparto } = useOrders();

  const irAlLocal = (o) =>
    navigation.navigate("NavegacionGps", {
      pedidoId: o.id,
      numero: o.numero,
      nombre: o.local.nombre,
      destino: "local",
    });

  const continuarEnReparto = (o) => {
    if (o.estado === "RETIRADO") {
      // Aún falta marcar "En camino al cliente" — se hace desde
      // ActualizarEstadoScreen (botón "Ver ruta hacia el cliente").
      navigation.navigate("ActualizarEstado", { pedidoId: o.id, numero: o.numero, estado: o.estado });
    } else {
      navigation.navigate("ConfirmarEntrega", {
        pedidoId: o.id,
        numero: o.numero,
        codigoConfirmacion: o.codigoConfirmacion,
      });
    }
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <AppButton
            title=""
            variant="dark"
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
            icon={<Icon name="arrow-left" size={22} color={colors.white} />}
          />
          <Text style={styles.headerTitle}>Pedidos en curso</Text>
        </View>
        <View style={styles.countBadge}>
          <Text style={styles.countBadgeText}>{enReparto.length + porRetirar.length} activos</Text>
        </View>
      </View>
      <ScrollView style={styles.scrollFlex} contentContainerStyle={styles.body}>
        <Section label="En reparto" color={colors.teal}>
          {enReparto.length === 0 ? <Text style={styles.emptyText}>No tienes pedidos en reparto.</Text> : null}
          {enReparto.map((o) => (
            <Card key={o.id} style={{ gap: 14 }}>
              <View style={styles.rowTop}>
                <Text style={styles.orderId}>Pedido {o.numero}</Text>
                <View style={[styles.statusBadge, { backgroundColor: colors.tealSoft }]}>
                  <Text style={[styles.statusText, { color: colors.teal }]}>
                    {o.estado === "RETIRADO" ? "Retirado" : "En camino"}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.orderName}>{o.cliente.nombre}</Text>
                <Text style={styles.orderDir}>{o.cliente.direccion}</Text>
              </View>
              <View style={styles.rowTop}>
                <View style={styles.metaRow}>
                  {o.distanciaKm ? (
                    <View style={styles.kmBadge}>
                      <Text style={styles.kmBadgeText}>{o.distanciaKm} km</Text>
                    </View>
                  ) : null}
                  <Text style={styles.orderDir}>{o.tiempoEstimadoMin ? `~${o.tiempoEstimadoMin} min` : null}</Text>
                </View>
                <Text style={styles.orderPrice}>{formatCLP(o.pago)}</Text>
              </View>
              <View>
                <View style={styles.progressLabelRow}>
                  <Text style={styles.progressLabel}>Progreso de entrega</Text>
                  <Text style={[styles.progressLabel, { color: colors.teal, fontWeight: "600" }]}>
                    {PROGRESO_POR_ESTADO[o.estado] ?? 40}%
                  </Text>
                </View>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: `${PROGRESO_POR_ESTADO[o.estado] ?? 40}%` }]} />
                </View>
              </View>
              <AppButton
                title={o.estado === "RETIRADO" ? "Ver ruta hacia el cliente" : "Entregar"}
                size="sm"
                onPress={() => continuarEnReparto(o)}
              />
            </Card>
          ))}
        </Section>

        <Section label="Por retirar" color={colors.red}>
          {porRetirar.length === 0 ? <Text style={styles.emptyText}>No tienes pedidos pendientes de retiro.</Text> : null}
          {porRetirar.map((o) => (
            <Card key={o.id} style={{ gap: 14 }}>
              <View style={styles.rowTop}>
                <Text style={styles.orderId}>Pedido {o.numero}</Text>
                <View style={[styles.statusBadge, { backgroundColor: colors.redSoft }]}>
                  <Text style={[styles.statusText, { color: colors.red }]}>
                    {o.estado === "LLEGADA_LOCAL" ? "En el local" : "Aceptado"}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.orderName}>{o.local.nombre}</Text>
                <Text style={styles.orderDir}>{o.local.direccion}</Text>
              </View>
              <View style={styles.rowTop}>
                <View style={styles.metaRow}>
                  {o.distanciaKm ? (
                    <View style={styles.kmBadge}>
                      <Text style={styles.kmBadgeText}>{o.distanciaKm} km</Text>
                    </View>
                  ) : null}
                  <Text style={styles.orderDir}>{o.tiempoEstimadoMin ? `~${o.tiempoEstimadoMin} min` : null}</Text>
                </View>
                <Text style={styles.orderPrice}>{formatCLP(o.pago)}</Text>
              </View>
              <AppButton
                title={o.estado === "LLEGADA_LOCAL" ? "Marcar pedido retirado" : "Ir al local"}
                size="sm"
                onPress={() =>
                  o.estado === "LLEGADA_LOCAL"
                    ? navigation.navigate("ActualizarEstado", { pedidoId: o.id, numero: o.numero, estado: o.estado })
                    : irAlLocal(o)
                }
              />
            </Card>
          ))}
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({ label, color, children }) {
  return (
    <View style={{ gap: 12 }}>
      <View style={styles.sectionHeader}>
        <View style={[styles.sectionDot, { backgroundColor: color }]} />
        <Text style={styles.sectionLabel}>{label}</Text>
      </View>
      <View style={{ gap: 12 }}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, width: "100%", backgroundColor: colors.bg },
  scrollFlex: { flex: 1 },
  header: {
    backgroundColor: colors.dark,
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  backBtn: { width: 40, height: 40, borderRadius: 20 },
  headerTitle: { fontFamily: fontBody, fontWeight: "600", fontSize: 20, color: colors.white },
  countBadge: { backgroundColor: colors.red, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  countBadgeText: { fontFamily: fontBody, fontWeight: "600", fontSize: 12, color: colors.white },
  body: { padding: 16, gap: 20 },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  sectionDot: { width: 8, height: 8, borderRadius: 4 },
  sectionLabel: {
    fontFamily: fontBody,
    fontWeight: "700",
    fontSize: 12,
    color: colors.muted,
    textTransform: "uppercase",
  },
  rowTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  orderId: { fontFamily: fontBody, fontWeight: "700", fontSize: 16, color: colors.dark },
  statusBadge: { borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  statusText: { fontFamily: fontBody, fontWeight: "600", fontSize: 12 },
  orderName: { fontFamily: fontBody, fontWeight: "600", fontSize: 16, color: colors.dark },
  orderDir: { fontFamily: fontBody, fontSize: 14, color: colors.muted },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  kmBadge: { backgroundColor: colors.red, borderRadius: 12, paddingHorizontal: 8, paddingVertical: 4 },
  kmBadgeText: { fontFamily: fontBody, fontWeight: "500", fontSize: 12, color: colors.white },
  orderPrice: { fontFamily: fontBody, fontWeight: "600", fontSize: 16, color: colors.red },
  progressLabelRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  progressLabel: { fontFamily: fontBody, fontSize: 11, color: colors.muted },
  progressTrack: { height: 6, borderRadius: 3, backgroundColor: "#e1e5ed", overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: colors.teal },
  emptyText: { fontFamily: fontBody, fontSize: 14, color: colors.muted },
});
