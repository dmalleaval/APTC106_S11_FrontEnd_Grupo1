import React, { useState, useRef } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopAppBar from "../components/TopAppBar";
import AppButton from "../components/AppButton";
import Icon from "../components/Icon";
import { colors, radii } from "../theme/colors";
import { fontUI } from "../theme/typography";

export default function RecuperarCodigoScreen({ navigation }) {
  const [digits, setDigits] = useState(["5", "8", "3", ""]);
  const refs = [useRef(), useRef(), useRef(), useRef()];

  const setDigit = (i, v) => {
    const next = [...digits];
    next[i] = v.slice(-1);
    setDigits(next);
    if (v && i < 3) refs[i + 1].current?.focus();
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <TopAppBar title="Verificar código" onBack={() => navigation.goBack()} />
      <ScrollView style={styles.scrollFlex} contentContainerStyle={styles.scroll}>
        <View style={styles.iconCircle}>
          <Icon name="shield-check" size={36} color={colors.dark} />
        </View>
        <View style={styles.textGroup}>
          <Text style={styles.title}>Ingresa el código</Text>
          <Text style={styles.subtitle}>
            Enviamos un código de 4 dígitos al correo p***@ejemplo.com
          </Text>
        </View>
        <View style={styles.codeRow}>
          {digits.map((d, i) => (
            <TextInput
              key={i}
              ref={refs[i]}
              value={d}
              onChangeText={(v) => setDigit(i, v)}
              keyboardType="number-pad"
              maxLength={1}
              style={[styles.codeBox, d !== "" && styles.codeBoxFilled]}
            />
          ))}
        </View>
        <View style={styles.actions}>
          <Text style={styles.resend}>
            <Text style={styles.link}>Reenviar código</Text>{" "}
            <Text style={styles.muted}>(00:45)</Text>
          </Text>
          <AppButton title="Verificar" onPress={() => navigation.navigate("RecuperarNuevaContrasena")} />
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
  codeRow: { flexDirection: "row", gap: 12, justifyContent: "center" },
  codeBox: {
    width: 56,
    height: 56,
    textAlign: "center",
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: radii.sm,
    fontFamily: fontUI,
    fontWeight: "500",
    fontSize: 24,
    color: colors.dark,
  },
  codeBoxFilled: { borderColor: colors.inputBorder },
  actions: { alignItems: "center", gap: 24 },
  resend: { fontFamily: fontUI, fontSize: 14 },
  link: { color: colors.red, textDecorationLine: "underline", fontWeight: "500" },
  muted: { color: colors.muted },
});
