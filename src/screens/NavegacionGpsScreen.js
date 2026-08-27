import React from "react";
import { View, Text, ImageBackground, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation, useQuery } from "@apollo/client";
import Card from "../components/Card";
import AppButton from "../components/AppButton";
import Icon from "../components/Icon";
import { colors } from "../theme/colors";
import { fontBody } from "../theme/typography";
import { AVANZAR_ESTADO_PEDIDO, PEDIDO } from "../api/queries";

export default function NavegacionGpsScreen({ navigation, route }) {
  const { pedidoId, numero, destino = "local" } = route.params || {};
  const isCliente = destino === "cliente";
  const [avanzarEstado, { loading: avanzando }] = useMutation(AVANZAR_ESTADO_PEDIDO);
  const { data, loading: cargandoPedido } = useQuery(PEDIDO, { variables: { id: pedidoId }, skip: !pedidoId });

  const pedido = data?.pedido;
  const destinoNombre = isCliente ? pedido?.cliente?.nombre : pedido?.local?.nombre;
  const loading = avanzando || cargandoPedido;

  const handleArrive = async () => {
    try {
      if (isCliente) {
        // La transición a EN_CAMINO_CLIENTE ya ocurrió antes de llegar acá
        // (ver ActualizarEstadoScreen -> botón "Ver ruta hacia el cliente").
        navigation.navigate("ActualizarEstado", { pedidoId, numero });
        return;
      }
      await avanzarEstado({ variables: { pedidoId, estado: "LLEGADA_LOCAL" } });
      navigation.navigate("ActualizarEstado", { pedidoId, numero });
    } catch (err) {
      Alert.alert("No se pudo actualizar el pedido", err.message || "Intenta de nuevo.");
    }
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <ImageBackground
        source={require("../../assets/images/map-navegacion.png")}
        style={styles.map}
        imageStyle={styles.mapImage}
      >
        <View style={styles.topCard}>
          <AppButton
            title=""
            variant="dark"
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
            icon={<Icon name="arrow-left" size={22} color={colors.white} />}
          />
          <Card style={styles.topCardInner}>
            <View style={styles.originDot} />
            <View style={{ flex: 1 }}>
              <Text style={styles.metaLabel}>{isCliente ? "Hacia el cliente" : "Hacia el local"}</Text>
              <Text style={styles.metaTitle}>{destinoNombre || "Cargando…"}</Text>
            </View>
            <View style={styles.distanceBadge}>
              <Text style={styles.distanceText}>
                {pedido?.distanciaKm ? `${pedido.distanciaKm} km` : "—"}
                {pedido?.tiempoEstimadoMin ? ` — ${pedido.tiempoEstimadoMin} min` : ""}
              </Text>
            </View>
          </Card>
        </View>

        <View style={styles.bottomArea}>
          <Card style={styles.maneuverCard}>
            <View style={styles.turnIcon}>
              <Icon name="arrow-up-right" size={24} color={colors.white} />
            </View>
            <View>
              <Text style={styles.maneuverTitle}>Siga por Av. Providencia</Text>
              <Text style={styles.maneuverTitle}>450 m</Text>
            </View>
          </Card>
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <AppButton
              title={isCliente ? "Ya llegué donde el cliente" : "Llegué al local"}
              onPress={handleArrive}
            />
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, width: "100%", backgroundColor: "#e1e5ed" },
  map: { flex: 1, width: "100%", height: "100%", justifyContent: "space-between" },
  mapImage: { width: "100%", height: "100%", resizeMode: "cover" },
  backBtn: { width: 40, height: 40, borderRadius: 20 },
  topCard: { flexDirection: "row", alignItems: "center", gap: 12, padding: 16 },
  topCardInner: { flex: 1, flexDirection: "row", alignItems: "center", gap: 12 },
  originDot: { width: 16, height: 16, borderRadius: 8, backgroundColor: colors.dark },
  metaLabel: { fontFamily: fontBody, fontWeight: "500", fontSize: 12, color: colors.muted },
  metaTitle: { fontFamily: fontBody, fontWeight: "600", fontSize: 16, color: colors.dark },
  distanceBadge: { backgroundColor: colors.red, borderRadius: 12, paddingHorizontal: 8, paddingVertical: 4 },
  distanceText: { fontFamily: fontBody, fontWeight: "500", fontSize: 12, color: colors.white },
  bottomArea: { padding: 16, gap: 16 },
  maneuverCard: { flexDirection: "row", alignItems: "center", gap: 16 },
  turnIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.dark,
    alignItems: "center",
    justifyContent: "center",
  },
  maneuverTitle: { fontFamily: fontBody, fontWeight: "600", fontSize: 16, color: colors.dark },
});
