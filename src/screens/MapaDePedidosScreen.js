import React from "react";
import { View, Text, ImageBackground, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "../components/AppButton";
import Icon from "../components/Icon";
import { colors } from "../theme/colors";
import { fontBody } from "../theme/typography";

const PINS = [
  { label: "🏍️ En reparto", top: 70, left: 70, bg: colors.teal },
  { label: "🏍️ En reparto", top: 190, left: 200, bg: colors.teal },
  { label: "🏪 Por retirar", top: 46, left: 260, bg: colors.red },
  { label: "🏪 Por retirar", top: 240, left: 30, bg: colors.red },
  { label: "🛍️ $2.900", top: 34, left: 110, bg: colors.red },
  { label: "🛍️ $3.200", top: 140, left: 270, bg: colors.red },
  { label: "🛍️ $1.800", top: 280, left: 160, bg: colors.red },
];

export default function MapaDePedidosScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Icon name="arrow-left" size={22} color={colors.white} />
          <Text style={styles.headerTitle}>Mapa de pedidos</Text>
        </View>
        <View style={styles.onlineBadge}>
          <Text style={styles.onlineBadgeText}>En línea</Text>
          <View style={styles.onlineKnob} />
        </View>
      </View>

      <ImageBackground
        source={require("../../assets/images/map-pedidos.png")}
        style={styles.map}
        imageStyle={styles.mapImage}
      >
        <View style={styles.legend}>
          <LegendItem color={colors.teal} label="En reparto (2)" />
          <LegendItem color={colors.red} label="Por retirar (2)" />
          <LegendItem color={colors.red} label="Disponibles (3)" />
          <LegendItem color="#3aa0e6" label="Tú" />
        </View>

        {PINS.map((p, i) => (
          <View key={i} style={[styles.pin, { top: p.top, left: p.left, backgroundColor: p.bg }]}>
            <Text style={styles.pinText}>{p.label}</Text>
          </View>
        ))}

        <View style={styles.meDot} />
      </ImageBackground>

      <View style={styles.bottomSheet}>
        <View style={styles.grabber} />
        <View style={styles.sheetRow}>
          <View style={styles.orderBadge}>
            <Text style={styles.orderBadgeText}>#1045</Text>
          </View>
          <Text style={styles.price}>$2.900</Text>
        </View>
        <View style={styles.sheetRow}>
          <Text style={styles.storeName}>Sushi Corner</Text>
          <View style={styles.distanceChip}>
            <Text style={styles.distanceChipText}>0.3 km</Text>
          </View>
        </View>
        <Text style={styles.hint}>A 0.3 km de tu ubicación</Text>
        <AppButton title="Tomar pedido" size="sm" onPress={() => navigation.navigate("DetalleDelPedido")} />
        <Text style={styles.swipeHint}>Desliza para ver más pedidos cercanos</Text>
      </View>
    </SafeAreaView>
  );
}

function LegendItem({ color, label }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <Text style={styles.legendText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, width: "100%", backgroundColor: colors.bg },
  header: {
    backgroundColor: colors.dark,
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  headerTitle: { fontFamily: fontBody, fontWeight: "600", fontSize: 20, color: colors.white },
  onlineBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.teal,
    paddingLeft: 12,
    paddingRight: 4,
  },
  onlineBadgeText: { fontFamily: fontBody, fontWeight: "500", fontSize: 12, color: colors.white },
  onlineKnob: { width: 24, height: 24, borderRadius: 12, backgroundColor: colors.white },
  map: { width: "100%", height: 420 },
  mapImage: { width: "100%", height: "100%", resizeMode: "cover" },
  legend: {
    position: "absolute",
    top: 12,
    left: 10,
    right: 10,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 12,
    padding: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontFamily: fontBody, fontWeight: "600", fontSize: 11, color: colors.dark },
  pin: {
    position: "absolute",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  pinText: { fontFamily: fontBody, fontWeight: "700", fontSize: 11, color: colors.white },
  meDot: {
    position: "absolute",
    top: 170,
    left: 158,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#3aa0e6",
    borderWidth: 3,
    borderColor: colors.white,
  },
  bottomSheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    gap: 12,
    flex: 1,
  },
  grabber: { alignSelf: "center", width: 36, height: 4, borderRadius: 2, backgroundColor: "#e0e0e0" },
  sheetRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  orderBadge: { backgroundColor: colors.redSoft, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  orderBadgeText: { fontFamily: fontBody, fontWeight: "700", fontSize: 12, color: colors.red },
  price: { fontFamily: fontBody, fontWeight: "700", fontSize: 18, color: colors.red },
  storeName: { fontFamily: fontBody, fontWeight: "700", fontSize: 16, color: colors.dark },
  distanceChip: { backgroundColor: colors.bg, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  distanceChipText: { fontFamily: fontBody, fontWeight: "600", fontSize: 12, color: colors.muted },
  hint: { fontFamily: fontBody, fontSize: 13, color: colors.muted },
  swipeHint: { fontFamily: fontBody, fontWeight: "500", fontSize: 11, color: colors.muted, textAlign: "center" },
});
