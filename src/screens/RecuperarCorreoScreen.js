import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopAppBar from "../components/TopAppBar";
import AppButton from "../components/AppButton";
import Field from "../components/Field";
import Icon from "../components/Icon";
import { colors } from "../theme/colors";
import { fontUI } from "../theme/typography";

export default function RecuperarCorreoScreen({ navigation }) {
  const [email, setEmail] = useState("");

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <TopAppBar title="Recuperar contraseña" onBack={() => navigation.goBack()} />
      <ScrollView style={styles.scrollFlex} contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.iconCircle}>
          <Icon name="mail" size={36} color={colors.dark} />
        </View>
        <View style={styles.textGroup}>
          <Text style={styles.title}>Recupera tu acceso</Text>
          <Text style={styles.subtitle}>
            Ingresa el correo asociado a tu cuenta y te enviaremos un código de verificación.
          </Text>
        </View>
        <View style={styles.form}>
          <Field
            label="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            placeholder="ejemplo@correo.com"
            keyboardType="email-address"
          />
          <AppButton title="Enviar código" onPress={() => navigation.navigate("RecuperarCodigo")} />
        </View>
        <View style={styles.loginRow}>
          <Text style={styles.muted}>
            ¿Recordaste tu contraseña?{" "}
            <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
              Inicia sesión
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, width: "100%", backgroundColor: colors.white },
  scrollFlex: { flex: 1 },
  scroll: { paddingHorizontal: 24, paddingVertical: 32, gap: 32 },
  iconCircle: {
    alignSelf: "center",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(34,37,42,0.07)",
    alignItems: "center",
    justifyContent: "center",
  },
  textGroup: { alignItems: "center", gap: 12 },
  title: { fontFamily: fontUI, fontWeight: "600", fontSize: 20, color: colors.dark },
  subtitle: {
    fontFamily: fontUI,
    fontSize: 14,
    lineHeight: 20,
    color: colors.muted,
    textAlign: "center",
  },
  form: { gap: 24 },
  loginRow: { alignItems: "center", paddingTop: 12 },
  muted: { fontFamily: fontUI, fontWeight: "500", fontSize: 14, color: colors.muted },
  link: { color: colors.red, textDecorationLine: "underline" },
});
