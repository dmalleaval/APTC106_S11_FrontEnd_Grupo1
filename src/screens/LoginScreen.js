import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "../components/AppButton";
import Field from "../components/Field";
import Icon from "../components/Icon";
import { colors } from "../theme/colors";
import { fontBody, fontUI } from "../theme/typography";
import { useAuth } from "../state/AuthContext";

export default function LoginScreen({ navigation }) {
  const { login, loggingIn } = useAuth();
  const [email, setEmail] = useState("pedro.ortega@ejemplo.com");
  const [password, setPassword] = useState("12345678");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setError(null);
    try {
      await login(email.trim(), password);
      navigation.navigate("Main");
    } catch (err) {
      setError(err.message || "No se pudo iniciar sesión. Intenta de nuevo.");
    }
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <ScrollView style={styles.scrollFlex} contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.brandBlock}>
          <View style={styles.logoRow}>
            <Icon name="scooter" size={36} color={colors.red} />
            <Text style={styles.brand}>FoodPlease</Text>
          </View>
          <Text style={styles.tagline}>Repartidor</Text>
        </View>

        <View style={styles.form}>
          <Field label="Correo electrónico" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <Field label="Contraseña" value={password} onChangeText={setPassword} secure />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.forgotRow}>
            <Text style={styles.link} onPress={() => navigation.navigate("RecuperarCorreo")}>
              ¿Olvidaste tu contraseña?
            </Text>
          </View>

          {loggingIn ? (
            <ActivityIndicator color={colors.red} />
          ) : (
            <AppButton title="Iniciar sesión" onPress={handleLogin} />
          )}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>v1.0 · APK distribución interna</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, width: "100%", backgroundColor: colors.bg },
  scrollFlex: { flex: 1 },
  scroll: { flexGrow: 1 },
  brandBlock: {
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingVertical: 56,
    paddingHorizontal: 16,
  },
  logoRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  brand: { fontFamily: fontBody, fontWeight: "900", fontSize: 36, color: colors.red },
  tagline: { fontFamily: fontBody, fontWeight: "600", fontSize: 22, color: colors.muted },
  form: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 30,
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 16,
  },
  errorText: { fontFamily: fontUI, fontSize: 13, color: colors.red },
  forgotRow: { alignItems: "flex-end" },
  link: { fontFamily: fontUI, fontWeight: "500", fontSize: 14, color: colors.red },
  footer: { backgroundColor: colors.white, alignItems: "center", paddingBottom: 8 },
  footerText: { fontFamily: fontBody, fontWeight: "500", fontSize: 12, color: colors.muted },
});
