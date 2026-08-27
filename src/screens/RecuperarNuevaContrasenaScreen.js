import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopAppBar from "../components/TopAppBar";
import AppButton from "../components/AppButton";
import Field from "../components/Field";
import Icon from "../components/Icon";
import { colors } from "../theme/colors";
import { fontUI } from "../theme/typography";

export default function RecuperarNuevaContrasenaScreen({ navigation }) {
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <TopAppBar title="Nueva contraseña" onBack={() => navigation.goBack()} />
      <ScrollView style={styles.scrollFlex} contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.iconCircle}>
          <Icon name="key" size={36} color={colors.dark} />
        </View>
        <View style={styles.textGroup}>
          <Text style={styles.title}>Crea tu nueva contraseña</Text>
          <Text style={styles.subtitle}>Tu contraseña debe tener al menos 8 caracteres.</Text>
        </View>
        <View style={styles.form}>
          <Field label="Nueva contraseña" value={pw} onChangeText={setPw} secure />
          <Field label="Confirmar contraseña" value={pw2} onChangeText={setPw2} secure />
          <AppButton
            title="Cambiar contraseña"
            onPress={() => navigation.navigate("ContrasenaActualizada")}
            style={{ marginTop: 8 }}
          />
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
  form: { gap: 16 },
});
