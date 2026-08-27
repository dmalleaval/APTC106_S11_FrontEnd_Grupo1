import { Platform } from "react-native";

// El diseño original usa Roboto (contenido/headings) e Inter (botones, inputs,
// barras de navegación). RN no trae Google Fonts por defecto: en vez de agregar
// `expo-font` + descargas de fuentes (fuera de alcance para esta maqueta), se
// mapea a las fuentes del sistema más parecidas en cada plataforma. Si más
// adelante quieres las tipografías reales, instala `expo-font` +
// `@expo-google-fonts/roboto` y `@expo-google-fonts/inter`, y reemplaza los
// valores de `fontBody` / `fontUI` acá por los nombres de fuente cargados.
export const fontBody = Platform.select({
  ios: "System",
  android: "sans-serif",
  default: "System",
});

export const fontUI = Platform.select({
  ios: "System",
  android: "sans-serif-medium",
  default: "System",
});

export const weight = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  black: "900",
};
