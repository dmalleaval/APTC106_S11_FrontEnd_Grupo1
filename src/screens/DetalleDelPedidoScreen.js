import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Alert, ActivityIndicator } from "react-native";
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

export default function DetalleDelPedidoScreen({ navigation, route }) {
  const { acceptOrder } = useOrders();
  const [submitting, setSubmitting] = useState(false);

  // route.params llega tal cual lo devuelve la query pedidosDisponibles
  // (ver src/api/queries.js -> fragment PedidoFields), navegado desde
  // PedidosDisponiblesScreen con navigation.navigate("DetalleDelPedido", p).
  const pedido = route.params;

  if (!pedido) {
    return (
      <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
        <View style={styles.body}>
          <Text style={styles.rowSubtitle}>No se encontró información del pedido.</Text>
          <AppButton title="Volver" onPress={() => navigation.navigate("Main")} />
        </View>
      </SafeAreaView>
    );
  }

  const { id, numero, local, cliente, pago, distanciaKm } = pedido;

  const handleAccept = async () => {
    setSubmitting(true);
    try {
      await acceptOrder(id);
      navigation.navigate("Main");
    } catch (err) {
      Alert.alert("No se pudo aceptar el pedido", err.message || "Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <AppButton
          title=""
          variant="dark"
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          icon={<Icon name="arrow-left" size={22} color={colors.white} />}
        />
        <Text style={styles.headerTitle}>Pedido {numero}</Text>
      </View>
      <ScrollView style={styles.scrollFlex} contentContainerStyle={styles.body}>
        <Card outline style={styles.row}>
          <View style={[styles.iconWrap, { backgroundColor: colors.redSoft }]}>
            <Icon name="store" size={20} color={colors.red} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.eyebrow, { color: colors.red }]}>RETIRO EN LOCAL</Text>
            <Text style={styles.rowTitle}>{local.nombre}</Text>
            <Text style={styles.rowSubtitle}>{local.direccion || "Dirección por confirmar"}</Text>
          </View>
        </Card>
        <Card outline style={styles.row}>
          <View style={[styles.iconWrap, { backgroundColor: colors.tealSoft }]}>
            <Icon name="user" size={20} color={colors.teal} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.eyebrow, { color: colors.teal }]}>ENTREGA AL CLIENTE</Text>
            <Text style={styles.rowTitle}>{cliente.nombre}</Text>
            <Text style={styles.rowSubtitle}>{cliente.direccion}</Text>
          </View>
        </Card>
        <Card dark style={styles.summaryRow}>
          <View>
            <Text style={styles.eyebrowLight}>DISTANCIA TOTAL</Text>
            <Text style={styles.summaryValue}>{distanciaKm ? `${distanciaKm} km` : "—"}</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.eyebrowLight}>PAGO DEL REPARTO</Text>
            <Text style={styles.summaryValue}>{formatCLP(pago)}</Text>
          </View>
        </Card>
      </ScrollView>
      <View style={styles.actions}>
        <AppButton
          title="Rechazar"
          variant="outline"
          style={{ flex: 1 }}
          onPress={() => navigation.navigate("Main")}
          disabled={submitting}
        />
        {submitting ? (
          <ActivityIndicator color={colors.red} style={{ flex: 1 }} />
        ) : (
          <AppButton title="Aceptar pedido" style={{ flex: 1 }} onPress={handleAccept} />
        )}
      </View>
    </SafeAreaView>
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
    gap: 12,
    paddingHorizontal: 16,
  },
  backBtn: { width: 40, height: 40, borderRadius: 20 },
  headerTitle: { fontFamily: fontBody, fontWeight: "600", fontSize: 20, color: colors.white },
  body: { padding: 16, gap: 16 },
  row: { flexDirection: "row", gap: 16 },
  iconWrap: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center" },
  eyebrow: { fontFamily: fontBody, fontWeight: "700", fontSize: 12, marginBottom: 4 },
  eyebrowLight: {
    fontFamily: fontBody,
    fontWeight: "700",
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 4,
  },
  rowTitle: { fontFamily: fontBody, fontWeight: "600", fontSize: 16, color: colors.dark, marginBottom: 2 },
  rowSubtitle: { fontFamily: fontBody, fontSize: 14, color: colors.muted },
  summaryRow: { flexDirection: "row", justifyContent: "space-between" },
  summaryValue: { fontFamily: fontBody, fontWeight: "600", fontSize: 22, color: colors.white },
  actions: { flexDirection: "row", gap: 16, padding: 16, backgroundColor: colors.white },
});
