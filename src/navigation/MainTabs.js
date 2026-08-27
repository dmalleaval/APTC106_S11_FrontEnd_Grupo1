import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomNavBar from "../components/BottomNavBar";
import PedidosDisponiblesScreen from "../screens/home/PedidosDisponiblesScreen";
import MapaDePedidosScreen from "../screens/MapaDePedidosScreen";
import HistorialDePedidosScreen from "../screens/HistorialDePedidosScreen";
import PerfilScreen from "../screens/PerfilScreen";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomNavBar {...props} />}
    >
      <Tab.Screen name="Pedidos" component={PedidosDisponiblesScreen} />
      <Tab.Screen name="Mapa" component={MapaDePedidosScreen} />
      <Tab.Screen name="Historial" component={HistorialDePedidosScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}
