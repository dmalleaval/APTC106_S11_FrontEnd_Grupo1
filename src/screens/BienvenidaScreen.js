import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import AppButton from "../components/AppButton";
import Icon from "../components/Icon";
import { colors } from "../theme/colors";
import { fontBody } from "../theme/typography";

export default function BienvenidaScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <ImageBackground
        source={require("../../assets/images/hero-bienvenida.png")}
        style={styles.hero}
        imageStyle={styles.heroImage}
      >
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.75)"]}
          locations={[0, 1]}
          style={styles.heroOverlay}
        />
        <View style={styles.heroContent}>
          <View style={styles.logoRow}>
            <Icon name="scooter" size={32} color={colors.red} />
            <Text style={styles.brand}>FoodPlease</Text>
          </View>
          <Text style={styles.tagline}>La experiencia comienza contigo</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>REPARTIDOR</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.actionContainer}>
        <AppButton title="Comenzar" onPress={() => navigation.navigate("Login")} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, width: "100%", backgroundColor: colors.bg },
  hero: { flex: 1, width: "100%", height: "100%", justifyContent: "flex-end" },
  heroImage: { width: "100%", height: "100%", resizeMode: "cover" },
  heroOverlay: StyleSheet.absoluteFillObject,
  heroContent: { padding: 24, gap: 8 },
  logoRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  brand: {
    fontFamily: fontBody,
    fontWeight: "900",
    fontSize: 32,
    color: colors.white,
  },
  tagline: {
    fontFamily: fontBody,
    fontWeight: "700",
    fontSize: 24,
    lineHeight: 32,
    color: colors.white,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: colors.red,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    fontFamily: fontBody,
    fontWeight: "700",
    fontSize: 12,
    color: colors.white,
  },
  actionContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 24,
  },
});
