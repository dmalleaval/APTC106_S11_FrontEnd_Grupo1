import { gql } from "@apollo/client";

const PEDIDO_FIELDS = gql`
  fragment PedidoFields on Pedido {
    id
    numero
    estado
    pago
    propina
    distanciaKm
    tiempoEstimadoMin
    codigoConfirmacion
    horaAceptado
    horaLlegadaLocal
    horaRetirado
    horaEnCaminoCliente
    horaEntregado
    local {
      nombre
      direccion
    }
    cliente {
      nombre
      direccion
      telefono
    }
  }
`;

export const LOGIN = gql`
  mutation Login($correo: String!, $password: String!) {
    login(correo: $correo, password: $password) {
      token
      repartidor {
        id
        nombre
        zona
        enLinea
        calificacion
        entregasCompletadas
        documentosAlDia
        notificacionesActivas
        vehiculo {
          tipo
          patente
        }
      }
    }
  }
`;

export const YO = gql`
  query Yo {
    yo {
      id
      nombre
      zona
      enLinea
      calificacion
      entregasCompletadas
      documentosAlDia
      notificacionesActivas
      vehiculo {
        tipo
        patente
      }
    }
  }
`;

export const SET_EN_LINEA = gql`
  mutation SetEnLinea($enLinea: Boolean!) {
    setEnLinea(enLinea: $enLinea) {
      id
      enLinea
    }
  }
`;

export const PEDIDO = gql`
  ${PEDIDO_FIELDS}
  query Pedido($id: ID!) {
    pedido(id: $id) {
      ...PedidoFields
    }
  }
`;

export const PEDIDOS_DISPONIBLES = gql`
  ${PEDIDO_FIELDS}
  query PedidosDisponibles {
    pedidosDisponibles {
      ...PedidoFields
    }
  }
`;

export const PEDIDOS_EN_CURSO = gql`
  ${PEDIDO_FIELDS}
  query PedidosEnCurso {
    pedidosEnCurso {
      ...PedidoFields
    }
  }
`;

export const HISTORIAL_PEDIDOS = gql`
  ${PEDIDO_FIELDS}
  query HistorialPedidos($dias: Int) {
    historialPedidos(dias: $dias) {
      ...PedidoFields
    }
  }
`;

export const RESUMEN_GANANCIAS = gql`
  query ResumenGanancias($fecha: String) {
    resumenGanancias(fecha: $fecha) {
      fecha
      totalGanado
      totalPropinas
      entregasCompletadas
    }
  }
`;

export const ACEPTAR_PEDIDO = gql`
  ${PEDIDO_FIELDS}
  mutation AceptarPedido($pedidoId: ID!) {
    aceptarPedido(pedidoId: $pedidoId) {
      ...PedidoFields
    }
  }
`;

export const AVANZAR_ESTADO_PEDIDO = gql`
  ${PEDIDO_FIELDS}
  mutation AvanzarEstadoPedido($pedidoId: ID!, $estado: EstadoPedido!) {
    avanzarEstadoPedido(pedidoId: $pedidoId, estado: $estado) {
      ...PedidoFields
    }
  }
`;

export const CONFIRMAR_ENTREGA = gql`
  ${PEDIDO_FIELDS}
  mutation ConfirmarEntrega($pedidoId: ID!, $codigo: String!, $fotoComprobanteUrl: String, $nota: String) {
    confirmarEntrega(pedidoId: $pedidoId, codigo: $codigo, fotoComprobanteUrl: $fotoComprobanteUrl, nota: $nota) {
      ...PedidoFields
    }
  }
`;
