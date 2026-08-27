import React from "react";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
import { ApolloProvider } from "@apollo/client";
import RootNavigator from "./src/navigation/RootNavigator";
import linking from "./src/navigation/linking";
import { apolloClient } from "./src/api/client";
import { AuthProvider } from "./src/state/AuthContext";
import { OrdersProvider } from "./src/state/OrdersContext";

// react-native-screens todavía no posiciona bien sus pantallas nativas en la
// web (los stacks se apilan verticalmente en vez de superponerse a pantalla
// completa, lo que además hace que el contenido de la pantalla activa se vea
// "duplicado" con la pantalla anterior debajo). En web usamos las Views
// normales de React Navigation en su lugar; en iOS/Android seguimos usando
// las screens nativas para mejor rendimiento.
if (Platform.OS === "web") {
  enableScreens(false);
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1, width: "100%", height: "100%" }}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <ApolloProvider client={apolloClient}>
          <AuthProvider>
            <OrdersProvider>
              <NavigationContainer linking={linking}>
                <RootNavigator />
              </NavigationContainer>
            </OrdersProvider>
          </AuthProvider>
        </ApolloProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
