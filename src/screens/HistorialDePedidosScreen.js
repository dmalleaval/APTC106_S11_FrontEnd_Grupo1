import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@apollo/client";
import Card from "../components/Card";
import Icon from "../components/Icon";
import { colors } from "../theme/colors";
import { fontBody } from "../theme/typography";
import { useOrders } from "../state/OrdersContext";
import { HISTORIAL_PEDIDOS, RESUMEN_GANANCIAS } from "../api/queries";

function formatCLP(n) {
  if (n == null) return "—";
  return `$${Math.round(n).toLocaleString("es-CL")}`;
}

function esHoy(iso) {
  if (!iso) return false;
  const d = new Date(iso);
  const hoy = new Date();
  return d.toDateString() === hoy.toDateString();
}

function formatHora(iso) {
  const d = new Date(iso);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function formatFecha(iso) {
  return new Date(iso).toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long" });
}

export default function HistorialDePedidosScreen() {
  const [tab, setTab] = useState("completados");
  const { porRetirar, enReparto, loading: loadingEnCurso } = useOrders();
  const { data: historialData, loading: loadingHistorial } = useQuery(HISTORIAL_PEDIDOS, {
    variables: { dias: 14 },
    skip: tab !== "completados",
  });
  const { data: resumenData } = useQuery(RESUMEN_GANANCIAS, { skip: tab !== "completados" });

  const historial = historialData?.historialPedidos ?? [];
  const hoy = historial.filter((p) => esHoy(p.horaEntregado));
  const anteriores = historial.filter((p) => !esHoy(p.horaEntregado));
  const resumen = resumenData?.resumenGanancias;
  const enCurso = [...enReparto, ...porRetirar];

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Historial de pedidos</Text>
      </View>
      <ScrollView style={styles.scrollFlex} contentContainerStyle={styles.body}>
        <View style={styles.chipsRow}>
          <Pressable onPress={() => setTab("en-curso")} style={[styles.chip, tab === "en-curso" && styles.chipActive]}>
            <Text style={[styles.chipText, tab === "en-curso" && styles.chipTextActive]}>En curso</Text>
          </Pressable>
          <Pressable onPress={() => setTab("completados")} style={[styles.chip, tab === "completados" && styles.chipActive]}>
            <Text style={[styles.chipText, tab === "completados" && styles.chipTextActive]}>Completados</Text>
          </Pressable>
        </View>

        {tab === "completados" ? (
          loadingHistorial && !historialData ? (
            <ActivityIndicator color={colors.red} style={{ marginTop: 24 }} />
          ) : (
            <>
              <Card style={styles.summaryCard}>
                <View style={styles.summaryCol}>
                  <Text style={styles.eyebrow}>HOY</Text>
                  <Text style={styles.summaryBig}>{formatCLP(resumen?.totalGanado ?? 0)}</Text>
                </View>
                <View style={styles.vDivider} />
                <View style={[styles.summaryCol, { alignItems: "center" }]}>
                  <Text style={styles.eyebrow}>ENTREGAS</Text>
                  <Text style={styles.summaryMid}>{resumen?.entregasCompletadas ?? 0} pedidos</Text>
                </View>
                <View style={styles.vDivider} />
                <View style={[styles.summaryCol, { alignItems: "flex-end" }]}>
                  <Text style={[styles.eyebrow, { color: colors.teal }]}>PROPINAS</Text>
                  <Text style={[styles.summaryMid, { color: colors.teal }]}>+{formatCLP(resumen?.totalPropinas ?? 0)}</Text>
                </View>
              </Card>

              {hoy.length > 0 ? (
                <>
                  <Text style={styles.dateLabel}>Hoy</Text>
                  {hoy.map((o) => (
                    <OrderRow key={o.id} order={o} />
                  ))}
                </>
              ) : null}

              {anteriores.length > 0 ? (
                <>
                  <Text style={styles.dateLabel}>Anteriores</Text>
                  {anteriores.map((o) => (
                    <OrderRow key={o.id} order={o} faded />
                  ))}
                </>
              ) : null}

              {historial.length === 0 ? <Text style={styles.emptyText}>Aún no tienes entregas completadas.</Text> : null}
            </>
          )
        ) : loadingEnCurso ? (
          <ActivityIndicator color={colors.red} style={{ marginTop: 24 }} />
        ) : (
          <>
            <Text style={styles.dateLabel}>Ahora</Text>
            {enCurso.length === 0 ? <Text style={styles.emptyText}>No tienes pedidos en curso.</Text> : null}
            {enCurso.map((o) => (
              <OrderRow key={o.id} order={o} enCurso />
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function OrderRow({ order, faded, enCurso }) {
  return (
    <Card style={[styles.orderRow, faded && { opacity: 0.65 }]}>
      <View style={{ flex: 1 }}>
        <Text style={styles.orderId}>{order.numero}</Text>
        <Text style={styles.orderName}>{order.local?.nombre}</Text>
        <Text style={styles.orderHoras}>
          {enCurso ? order.cliente?.direccion : order.horaEntregado ? formatFecha(order.horaEntregado) + " · " + formatHora(order.horaEntregado) : ""}
        </Text>
      </View>
      <View style={styles.orderRight}>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.orderPrecio}>{formatCLP(order.pago)}</Text>
          {enCurso ? (
            <Text style={[styles.orderStatusText, { color: order.estado === "ACEPTADO" || order.estado === "LLEGADA_LOCAL" ? colors.red : colors.teal }]}>
              {order.estado.replaceAll("_", " ").toLowerCase()}
            </Text>
          ) : order.propina ? (
            <Text style={styles.orderPropina}>+ {formatCLP(order.propina)} propina</Text>
          ) : null}
        </View>
        <View style={[styles.checkDot, enCurso && { backgroundColor: colors.redSoft }]}>
          <Icon name={enCurso ? "clock" : "check"} size={12} color={enCurso ? colors.red : colors.teal} />
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, width: "100%", backgroundColor: colors.bg },
  scrollFlex: { flex: 1 },
  header: { backgroundColor: colors.dark, minHeight: 56, justifyContent: "center", paddingHorizontal: 16 },
  headerTitle: { fontFamily: fontBody, fontWeight: "600", fontSize: 20, color: colors.white },
  body: { padding: 16, gap: 12 },
  chipsRow: { flexDirection: "row", gap: 8 },
  chip: {
    height: 32,
    borderRadius: 16,
    paddingHorizontal: 16,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.inputBorder,
  },
  chipActive: { backgroundColor: colors.dark, borderColor: colors.dark },
  chipText: { fontFamily: fontBody, fontWeight: "500", fontSize: 14, color: colors.dark },
  chipTextActive: { color: colors.white },
  summaryCard: { flexDirection: "row", alignItems: "center" },
  summaryCol: { flex: 1 },
  vDivider: { width: 1, height: 40, backgroundColor: colors.border2 },
  eyebrow: { fontFamily: fontBody, fontWeight: "500", fontSize: 12, color: colors.muted },
  summaryBig: { fontFamily: fontBody, fontWeight: "700", fontSize: 24, color: colors.dark },
  summaryMid: { fontFamily: fontBody, fontWeight: "600", fontSize: 18, color: colors.dark },
  dateLabel: { fontFamily: fontBody, fontWeight: "500", fontSize: 12, color: colors.muted, marginTop: 4 },
  emptyText: { fontFamily: fontBody, fontSize: 14, color: colors.muted },
  orderRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  orderId: { fontFamily: fontBody, fontWeight: "500", fontSize: 12, color: colors.muted },
  orderName: { fontFamily: fontBody, fontWeight: "600", fontSize: 16, color: colors.dark },
  orderHoras: { fontFamily: fontBody, fontSize: 12, color: colors.muted },
  orderRight: { flexDirection: "row", alignItems: "center", gap: 12 },
  orderPrecio: { fontFamily: fontBody, fontWeight: "600", fontSize: 16, color: colors.dark },
  orderPropina: { fontFamily: fontBody, fontWeight: "500", fontSize: 12, color: colors.teal },
  orderStatusText: { fontFamily: fontBody, fontWeight: "600", fontSize: 12 },
  checkDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.tealSoft,
    alignItems: "center",
    justifyContent: "center",
  },
});
