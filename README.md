# APTC106_S11_Grupo1_frontend

Repositorio correspondiente a sección APTC106 Grupo 1 — Aplicativo móvil FoodPlease

## Integrantes

- Isabel Vera
- Gabriel Vera
- Diego Mallea

## FoodPlease · Repartidor — React Native + Expo, conectado a backend real

Aplicación móvil para el perfil de repartidor, donde podrá recibir pedidos, navegar vía GPS, actualizar estados de pedidos y confirmar entregas. Adicionalmente podrá visualizar los pedidos realizados, en curso y los montos asociados.

Construida con **React Native + Expo** (JavaScript) y **React Navigation**. Desde la Semana 11, la app dejó de usar datos hardcodeados: consume una API GraphQL propia (repo [`APTC106_S11_Grupo1_backend`](https://github.com/Isa-V/APTC106_S11_Grupo1_backend)) vía **Apollo Client**, con login real (JWT) y persistencia en **MongoDB Atlas**.

El backend corre desplegado en **Azure App Service**; la base de datos vive aparte, en **MongoDB Atlas** (no está alojada en Azure — ver el README del backend para el detalle de esa separación).

### Conectar con el backend

1. Levantar el backend ([`APTC106_S11_Grupo1_backend`](https://github.com/Isa-V/APTC106_S11_Grupo1_backend), ver su README) — por defecto en `http://localhost:4000/graphql`.
2. `npm install` acá.
3. `npm run seed` en el backend para tener un usuario de prueba
   (`pedro.ortega@ejemplo.com` / `12345678`) y pedidos de ejemplo.
4. `npx expo start` — por defecto ya apunta a `http://localhost:4000/graphql`
   (`src/api/client.js`). Para apuntar a producción, copiar `.env.example` a
   `.env` con `EXPO_PUBLIC_API_URL` (ya configurado con la URL de Azure en este repo).

### GitHub Pages

**https://isa-v.github.io/APTC106_S11_Grupo1_frontend/**

Se abre directo en el navegador, sin instalar nada. Está generado a partir del build estático (`expo export --platform web`), publicado en la rama `gh-pages`. Esta versión publicada ya está conectada al backend real desplegado en Azure — el login y los datos son reales, no simulados.

> Sirve para una revisión rápida de las pantallas y la navegación. No reemplaza probar el APK en un celular real: en el navegador no hay acceso a la cámara ni al GPS del dispositivo.

Además de GitHub Pages, hay otras dos formas de probarla:

1. [Instalar el APK en un celular Android](#1-instalar-el-apk-en-un-celular-android) — la app real, distribuible fuera de una tienda de aplicaciones.
2. [Correrla en modo desarrollo](#2-correrla-en-modo-desarrollo) — para modificar el código.

---

## 1. Instalar el APK en un celular Android

Esto es lo que demuestra que la app es **distribuible de manera directa, fuera de una tienda de aplicaciones** (no requiere Play Store).

### Descarga directa

> **Pendiente de regenerar:** el build anterior (24-08-2026) es previo a la integración con el backend real (Apollo Client + API en Azure) y quedó desactualizado. Generar uno nuevo con los pasos de abajo antes de distribuirlo.

Una vez generado el nuevo build, este README se actualiza con el link directo. Mientras tanto, seguir los pasos de "Generar el APK" abajo (toma ~15 minutos).

### Generar el APK

Requiere una cuenta gratuita en [expo.dev](https://expo.dev) y tener el proyecto instalado localmente (ver [sección 2](#2-correrla-en-modo-desarrollo)).

```bash
npx eas-cli@latest login
npx eas-cli@latest build --platform android --profile preview
```

El build se compila en la nube de Expo (10–20 minutos aprox., no requiere Android Studio). Al terminar, la terminal muestra un enlace y un código QR para descargar el `.apk`.

### Instalarlo

1. Desde el celular, escanea el QR o abre el enlace que entregó el build — descarga el archivo `.apk`.
2. Al abrirlo, Android va a bloquear la instalación con un aviso de "fuente desconocida" la primera vez. Toca **Configuración** en ese mismo aviso → activa **Permitir de esta fuente** → vuelve a abrir el APK.
3. Se instala como cualquier app y queda en el cajón de aplicaciones del celular, lista para abrir.

## 2. Correrla en modo desarrollo

### Requisitos

- Node.js 18 o superior
- npm (o yarn/pnpm)
- La app [Expo Go](https://expo.dev/go) en tu celular, si quieres probarla en un dispositivo real sin generar el APK (opcional — también corre en el navegador)

### Instalación

```bash
npm install
npx expo install --check
```

### Correrla

```bash
npx expo start        # abre el menú de Expo (QR para celular con Expo Go, o presiona 'w' para abrir en el navegador)
npx expo start --web  # abre directo en el navegador
```

## Estructura del proyecto

```
App.js                        → entry point: NavigationContainer + linking
app.json / eas.json           → configuración de Expo y de los builds (EAS)
src/
  theme/                      → colores, tipografía (tokens del diseño Figma)
  components/                 → Icon, AppButton, Field, Card, TopAppBar, BottomNavBar
  navigation/
    RootNavigator.js          → Stack principal (login, recuperar clave,
                                 flujo de un pedido, etc.)
    MainTabs.js                → Bottom Tabs (Pedidos, Mapa, Historial, Perfil)
    linking.js                 → mapea cada pantalla a una URL, para que
                                  funcione bien en la versión web
  screens/                     → una carpeta/archivo por pantalla
assets/images/                 → imágenes de marcador de posición
```

### Pantallas incluidas (16 rutas de navegación)

Bienvenida, Login, Recuperar contraseña (correo → código → nueva contraseña), Contraseña actualizada, **Main** (Tabs: Pedidos disponibles, Mapa de pedidos, Historial de pedidos, Perfil), Detalle del pedido, Navegación GPS, Actualizar estado, Confirmar entrega, Entrega completada, Pedidos en curso.

Los estados "fuera de línea", "snackbar de activación" y "cargando" del diseño original **no son rutas separadas** — se manejan como estado local dentro de la pantalla Home (`src/screens/home/PedidosDisponiblesScreen.js`), tal como funcionaría una pantalla real.
