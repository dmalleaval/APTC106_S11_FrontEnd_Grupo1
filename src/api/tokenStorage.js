import AsyncStorage from "@react-native-async-storage/async-storage";

// AsyncStorage (y no expo-secure-store) porque esta app corre tanto como
// APK Android como build web (GitHub Pages / Azure Static Web Apps), y
// SecureStore no tiene implementación en web. AsyncStorage sí — en web usa
// localStorage por debajo vía react-native-web.
const KEY = "foodplease_token";

export const tokenStorage = {
  get: () => AsyncStorage.getItem(KEY),
  set: (token) => AsyncStorage.setItem(KEY, token),
  clear: () => AsyncStorage.removeItem(KEY),
};
