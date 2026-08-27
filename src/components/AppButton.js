import React from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { colors, radii } from "../theme/colors";
import { fontUI, fontBody } from "../theme/typography";

const VARIANTS = {
  dark: { bg: colors.dark, fg: colors.white, border: null },
  teal: { bg: colors.teal, fg: colors.white, border: null },
  red: { bg: colors.red, fg: colors.white, border: null },
  outline: { bg: "transparent", fg: colors.dark, border: colors.dark },
  "pill-outline": { bg: "transparent", fg: colors.dark, border: colors.dark },
};

export default function AppButton({
  title,
  onPress,
  variant = "dark",
  size = "md",
  icon,
  style,
  disabled,
}) {
  const v = VARIANTS[variant] || VARIANTS.dark;
  const height = size === "sm" ? 44 : size === "md-sm" ? 48 : 56;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        {
          height,
          backgroundColor: v.bg,
          borderColor: v.border || "transparent",
          borderWidth: v.border ? (variant === "outline" ? 2 : 1) : 0,
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
        },
        style,
      ]}
    >
      <View style={styles.content}>
        {icon}
        <Text
          style={[
            styles.label,
            { color: v.fg, fontFamily: size === "sm" ? fontBody : fontUI },
          ]}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    width: "100%",
    borderRadius: radii.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  label: {
    fontWeight: "600",
    fontSize: 14,
    letterSpacing: 0.1,
  },
});
