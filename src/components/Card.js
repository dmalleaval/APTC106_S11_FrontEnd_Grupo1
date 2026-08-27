import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { colors, radii } from "../theme/colors";

export default function Card({ children, style, outline, dark }) {
  return (
    <View
      style={[
        styles.base,
        outline && styles.outline,
        dark && styles.dark,
        !outline && !dark && styles.shadow,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: 16,
  },
  shadow: Platform.select({
    web: { boxShadow: "0 1px 1.5px rgba(0,0,0,0.08)" },
    default: {
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 1.5,
      shadowOffset: { width: 0, height: 1 },
      elevation: 2,
    },
  }),
  outline: {
    borderWidth: 1,
    borderColor: colors.border,
  },
  dark: {
    backgroundColor: colors.dark,
  },
});
