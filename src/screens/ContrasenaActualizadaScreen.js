import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "../components/AppButton";
import Card from "../components/Card";
import Icon from "../components/Icon";
import { colors } from "../theme/colors";
import { fontBody } from "../theme/typography";

export default function ContrasenaActualizadaScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <View style={styles.content}>
        <View style={styles.successCircle}>
          <Icon name="shield-check" size={48} color={colors.white} />
        </View>
        <View style={styles.textGroup}>
          <Text style={styles.title}>¡Contraseña actualizada!</Text>
          <Text style={styles.subtitle}>
            Tu contraseña ha sido cambiada exitosamente. Ya puedes iniciar sesión con tu nueva
            contraseña.
          </Text>
        </View>
        <Card style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Icon name="lock" size={20} color={colors.teal} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.infoTitle}>Tu cuenta está protegida</Text>
            <Text style={styles.infoSubtitle}>Último cambio realizado ahora mismo</Text>
          </View>
        </Card>
      </View>
      <View style={styles.actions}>
        <AppButton title="Iniciar sesión" onPress={() => navigation.navigate("Login")} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, width: "100%", backgroundColor: colors.bg },
  content: { flex: 1, alignItems: "center", paddingTop: 60, paddingHorizontal: 16, gap: 28 },
  successCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.teal,
    alignItems: "center",
    justifyContent: "center",
  },
  textGroup: { alignItems: "center", gap: 12 },
  title: { fontFamily: fontBody, fontWeight: "700", fontSize: 24, color: colors.dark },
  subtitle: {
    fontFamily: fontBody,
    fontSize: 14,
    lineHeight: 20,
    color: colors.muted,
    textAlign: "center",
    maxWidth: 300,
  },
  infoCard: { flexDirection: "row", gap: 16, alignItems: "center", width: "100%" },
  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#e8f8f5",
    alignItems: "center",
    justifyContent: "center",
  },
  infoTitle: { fontFamily: fontBody, fontWeight: "600", fontSize: 14, color: colors.dark },
  infoSubtitle: { fontFamily: fontBody, fontSize: 12, color: colors.muted },
  actions: { paddingHorizontal: 16, paddingBottom: 8 },
});
