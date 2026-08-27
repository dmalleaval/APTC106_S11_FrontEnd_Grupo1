import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Icon from "./Icon";
import { colors } from "../theme/colors";
import { fontUI } from "../theme/typography";

export default function TopAppBar({ title, onBack, dark = true }) {
  return (
    <View
      style={[
        styles.bar,
        { backgroundColor: dark ? colors.dark : "transparent" },
      ]}
    >
      {onBack ? (
        <Pressable onPress={onBack} hitSlop={8} style={styles.backBtn}>
          <Icon name="arrow-left" size={24} color={dark ? colors.white : colors.dark} />
        </Pressable>
      ) : (
        <View style={styles.backBtn} />
      )}
      <Text style={[styles.title, { color: dark ? colors.white : colors.dark }]} numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 56,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 16,
  },
  backBtn: { padding: 4 },
  title: {
    fontFamily: fontUI,
    fontWeight: "500",
    fontSize: 18,
    flex: 1,
  },
});
