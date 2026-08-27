import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../components/Card";
import AppButton from "../components/AppButton";
import Icon from "../components/Icon";
import { colors } from "../theme/colors";
import { fontBody } from "../theme/typography";
import { useAuth } from "../state/AuthContext";

function iniciales(nombre) {
  if (!nombre) return "—";
  return nombre.split(" ").slice(0, 2).map((p) => p[0]).join("").toUpperCase();
}

export default function PerfilScreen({ navigation }) {
  const { repartidor, logout } = useAuth();

  const rows = [
    { label: "Vehículo", value: `${repartidor?.vehiculo?.tipo || "—"} · ${repartidor?.vehiculo?.patente || "—"}` },
    { label: "Documentos", badge: repartidor?.documentosAlDia ? "Al día" : "Pendiente" },
    { label: "Notificaciones", badge: repartidor?.notificacionesActivas ? "Activas" : "Inactivas" },
  ];

  const handleLogout = async () => {
    await logout();
    navigation.reset({ index: 0, routes: [{ name: "Bienvenida" }] });
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi perfil</Text>
      </View>
      <ScrollView style={styles.scrollFlex} contentContainerStyle={styles.body}>
        <Card style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{iniciales(repartidor?.nombre)}</Text>
          </View>
          <View>
            <Text style={styles.name}>{repartidor?.nombre || "—"}</Text>
            <View style={styles.ratingRow}>
              <Icon name="star" size={14} color={colors.red} />
              <Text style={styles.ratingText}>{repartidor?.calificacion?.toFixed(1) ?? "—"}</Text>
              <Text style={styles.deliveries}>{repartidor?.entregasCompletadas ?? 0} entregas</Text>
            </View>
          </View>
        </Card>

        <Card style={{ padding: 0 }}>
          {rows.map((row, i) => (
            <View key={row.label} style={[styles.row, i < rows.length - 1 && styles.rowBorder]}>
              <Text style={styles.rowLabel}>{row.label}</Text>
              {row.badge ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{row.badge}</Text>
                </View>
              ) : (
                <Text style={styles.rowValue}>{row.value}</Text>
              )}
            </View>
          ))}
        </Card>

        <AppButton title="Cerrar sesión" variant="outline" onPress={handleLogout} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, width: "100%", backgroundColor: colors.bg },
  scrollFlex: { flex: 1 },
  header: { backgroundColor: colors.dark, minHeight: 56, justifyContent: "center", paddingHorizontal: 16 },
  headerTitle: { fontFamily: fontBody, fontWeight: "600", fontSize: 22, color: colors.white },
  body: { padding: 16, gap: 16 },
  profileCard: { flexDirection: "row", gap: 16, alignItems: "center" },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.red,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontFamily: fontBody, fontWeight: "700", fontSize: 24, color: colors.white },
  name: { fontFamily: fontBody, fontWeight: "600", fontSize: 16, color: colors.dark, marginBottom: 4 },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  ratingText: { fontFamily: fontBody, fontWeight: "700", fontSize: 12, color: colors.red },
  deliveries: { fontFamily: fontBody, fontSize: 14, color: colors.muted },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border2 },
  rowLabel: { fontFamily: fontBody, fontSize: 16, color: colors.dark },
  rowValue: { fontFamily: fontBody, fontWeight: "600", fontSize: 16, color: colors.dark },
  badge: { backgroundColor: colors.teal, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4 },
  badgeText: { fontFamily: fontBody, fontWeight: "500", fontSize: 12, color: colors.white },
});
