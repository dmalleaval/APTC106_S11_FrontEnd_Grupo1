import React, { useState } from "react";
import { View, Text, TextInput, Image, Pressable, ScrollView, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { useMutation } from "@apollo/client";
import Card from "../components/Card";
import AppButton from "../components/AppButton";
import Icon from "../components/Icon";
import { colors } from "../theme/colors";
import { fontBody } from "../theme/typography";
import { CONFIRMAR_ENTREGA } from "../api/queries";

export default function ConfirmarEntregaScreen({ navigation, route }) {
  const { pedidoId, numero, codigoConfirmacion } = route.params || {};
  const [photo, setPhoto] = useState(null);
  const [note, setNote] = useState("");
  // Precargado con el código real del pedido: en este MVP todavía no existe
  // la app del cliente que se lo muestre, así que se autocompleta para
  // poder demostrar el flujo end-to-end (queda editable para poder probar
  // también el caso de código incorrecto).
  const [codigo, setCodigo] = useState(codigoConfirmacion || "");
  const [confirmarEntrega, { loading }] = useMutation(CONFIRMAR_ENTREGA);

  const handleTakePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) return;
    const result = await ImagePicker.launchCameraAsync({ quality: 0.6 });
    if (!result.canceled) setPhoto(result.assets[0].uri);
  };

  const handleConfirm = async () => {
    try {
      const { data } = await confirmarEntrega({
        variables: {
          pedidoId,
          codigo: codigo.trim(),
          // Nota: acá se envía la URI local de la imagen (o ninguna). Subir
          // la foto a un storage en la nube (S3 / Azure Blob) y guardar esa
          // URL pública queda como mejora futura — ver informe, sección de
          // conclusiones.
          fotoComprobanteUrl: photo || undefined,
          nota: note || undefined,
        },
      });
      const pedido = data.confirmarEntrega;
      navigation.navigate("EntregaCompletada", {
        numero: pedido.numero,
        pago: pedido.pago,
        propina: pedido.propina,
        horaEntregado: pedido.horaEntregado,
      });
    } catch (err) {
      Alert.alert("No se pudo confirmar la entrega", err.message || "Revisa el código e intenta de nuevo.");
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
        <Text style={styles.headerTitle}>Confirmar entrega {numero ? `· ${numero}` : ""}</Text>
      </View>
      <ScrollView style={styles.scrollFlex} contentContainerStyle={styles.body}>
        <Card outline style={styles.codeCard}>
          <Text style={styles.eyebrow}>CÓDIGO DEL CLIENTE</Text>
          <TextInput
            value={codigo}
            onChangeText={(v) => setCodigo(v.replace(/[^0-9]/g, "").slice(0, 4))}
            keyboardType="number-pad"
            maxLength={4}
            placeholder="0000"
            placeholderTextColor={colors.muted}
            style={styles.code}
            textAlign="center"
          />
          <Text style={styles.codeHint}>Pídele al cliente el código de 4 dígitos que le llegó a su app.</Text>
        </Card>
        <Pressable style={styles.photoBox} onPress={handleTakePhoto}>
          {photo ? (
            <>
              <Image source={{ uri: photo }} style={styles.photoPreview} />
              <Text style={styles.photoText}>Toca para tomar otra foto</Text>
            </>
          ) : (
            <>
              <Icon name="camera" size={32} color={colors.muted} />
              <Text style={styles.photoText}>Adjuntar foto de comprobante</Text>
            </>
          )}
        </Pressable>
        <View style={styles.noteBox}>
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="Nota opcional (ej: dejado en conserjería)"
            placeholderTextColor={colors.muted}
            multiline
            style={styles.noteInput}
          />
        </View>
      </ScrollView>
      <View style={styles.actions}>
        {loading ? (
          <ActivityIndicator color={colors.teal} />
        ) : (
          <AppButton
            title="Confirmar entrega"
            variant="teal"
            onPress={handleConfirm}
            disabled={codigo.length !== 4}
          />
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
  codeCard: { alignItems: "center", gap: 8 },
  eyebrow: { fontFamily: fontBody, fontWeight: "700", fontSize: 12, color: colors.muted },
  code: {
    fontFamily: fontBody,
    fontWeight: "700",
    fontSize: 36,
    letterSpacing: 6,
    color: colors.dark,
    minWidth: 160,
  },
  codeHint: { fontFamily: fontBody, fontSize: 12, color: colors.muted, textAlign: "center" },
  photoBox: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.border,
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    gap: 8,
  },
  photoText: { fontFamily: fontBody, fontSize: 14, color: colors.muted },
  photoPreview: { width: "100%", height: 160, borderRadius: 8 },
  noteBox: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 12 },
  noteInput: { fontFamily: fontBody, fontSize: 14, color: colors.dark, minHeight: 40, textAlignVertical: "top" },
  actions: { padding: 16, backgroundColor: colors.white },
});
