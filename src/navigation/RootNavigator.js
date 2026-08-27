import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabs from "./MainTabs";

import BienvenidaScreen from "../screens/BienvenidaScreen";
import LoginScreen from "../screens/LoginScreen";
import RecuperarCorreoScreen from "../screens/RecuperarCorreoScreen";
import RecuperarCodigoScreen from "../screens/RecuperarCodigoScreen";
import RecuperarNuevaContrasenaScreen from "../screens/RecuperarNuevaContrasenaScreen";
import ContrasenaActualizadaScreen from "../screens/ContrasenaActualizadaScreen";
import DetalleDelPedidoScreen from "../screens/DetalleDelPedidoScreen";
import NavegacionGpsScreen from "../screens/NavegacionGpsScreen";
import ActualizarEstadoScreen from "../screens/ActualizarEstadoScreen";
import ConfirmarEntregaScreen from "../screens/ConfirmarEntregaScreen";
import EntregaCompletadaScreen from "../screens/EntregaCompletadaScreen";
import PedidosEnCursoScreen from "../screens/PedidosEnCursoScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Bienvenida"
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen name="Bienvenida" component={BienvenidaScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="RecuperarCorreo" component={RecuperarCorreoScreen} />
      <Stack.Screen name="RecuperarCodigo" component={RecuperarCodigoScreen} />
      <Stack.Screen name="RecuperarNuevaContrasena" component={RecuperarNuevaContrasenaScreen} />
      <Stack.Screen name="ContrasenaActualizada" component={ContrasenaActualizadaScreen} />
      <Stack.Screen name="Main" component={MainTabs} />
      <Stack.Screen name="DetalleDelPedido" component={DetalleDelPedidoScreen} />
      <Stack.Screen name="NavegacionGps" component={NavegacionGpsScreen} />
      <Stack.Screen name="ActualizarEstado" component={ActualizarEstadoScreen} />
      <Stack.Screen name="ConfirmarEntrega" component={ConfirmarEntregaScreen} />
      <Stack.Screen name="EntregaCompletada" component={EntregaCompletadaScreen} />
      <Stack.Screen name="PedidosEnCurso" component={PedidosEnCursoScreen} />
    </Stack.Navigator>
  );
}
