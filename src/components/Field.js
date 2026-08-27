import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import Icon from "./Icon";
import { colors, radii } from "../theme/colors";
import { fontUI } from "../theme/typography";

export default function Field({
  label,
  value,
  onChangeText,
  secure,
  placeholder,
  keyboardType,
}) {
  const [hidden, setHidden] = useState(!!secure);
  return (
    <View style={styles.field}>
      <View style={styles.body}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.muted}
          secureTextEntry={secure && hidden}
          keyboardType={keyboardType}
          style={styles.input}
        />
      </View>
      {secure ? (
        <Pressable onPress={() => setHidden((h) => !h)} hitSlop={8}>
          <Icon name="eye" size={22} color={colors.dark} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    width: "100%",
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: radii.sm,
    height: 56,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  body: { flex: 1 },
  label: {
    fontFamily: fontUI,
    fontSize: 12,
    color: colors.label,
    lineHeight: 16,
  },
  input: {
    fontFamily: fontUI,
    fontSize: 16,
    color: colors.text,
    padding: 0,
    height: 24,
  },
});
