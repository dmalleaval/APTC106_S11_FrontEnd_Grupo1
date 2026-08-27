import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Icon from "./Icon";
import { colors } from "../theme/colors";
import { fontBody } from "../theme/typography";

const TABS = [
  { key: "Pedidos", label: "Pedidos", icon: "shopping-bag" },
  { key: "Mapa", label: "Mapa", icon: "map" },
  { key: "Historial", label: "Historial", icon: "clock" },
  { key: "Perfil", label: "Perfil", icon: "user" },
];

/**
 * Tab bar propia (no la de @react-navigation/bottom-tabs) para calzar
 * exactamente con el diseño de Figma. Se usa como `tabBar` custom del
 * Bottom Tab Navigator — ver src/navigation/MainTabs.js.
 */
export default function BottomNavBar({ state, navigation }) {
  const activeName = state.routeNames[state.index];
  return (
    <View style={styles.bar}>
      {TABS.map((tab) => {
        const active = tab.key === activeName;
        return (
          <Pressable
            key={tab.key}
            style={styles.tab}
            onPress={() => navigation.navigate(tab.key)}
          >
            <View
              style={[styles.iconWrap, active && styles.iconWrapActive]}
            >
              <Icon
                name={tab.icon}
                size={22}
                color={active ? colors.red : colors.muted}
              />
            </View>
            <Text style={[styles.label, active && styles.labelActive]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 72,
    width: "100%",
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  iconWrap: {
    width: 48,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapActive: {
    backgroundColor: colors.redSoft,
  },
  label: {
    fontFamily: fontBody,
    fontWeight: "500",
    fontSize: 11,
    color: colors.muted,
  },
  labelActive: {
    color: colors.red,
  },
});
