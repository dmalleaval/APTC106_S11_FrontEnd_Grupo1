// Configuración de deep linking: hace que la URL en el navegador (GitHub
// Pages / expo web) refleje la pantalla activa, y que el botón atrás/adelante
// del navegador funcione como esperarías. En un build para iOS/Android esto
// simplemente no se usa.
const linking = {
  prefixes: [],
  config: {
    screens: {
      Bienvenida: "bienvenida",
      Login: "login",
      RecuperarCorreo: "recuperar-correo",
      RecuperarCodigo: "recuperar-codigo",
      RecuperarNuevaContrasena: "recuperar-nueva-contrasena",
      ContrasenaActualizada: "contrasena-actualizada",
      Main: {
        path: "app",
        screens: {
          Pedidos: "pedidos",
          Mapa: "mapa",
          Historial: "historial",
          Perfil: "perfil",
        },
      },
      DetalleDelPedido: "pedido/detalle",
      NavegacionGps: "pedido/navegacion",
      ActualizarEstado: "pedido/estado",
      ConfirmarEntrega: "pedido/confirmar",
      EntregaCompletada: "pedido/completado",
      PedidosEnCurso: "pedidos-en-curso",
    },
  },
};

export default linking;
