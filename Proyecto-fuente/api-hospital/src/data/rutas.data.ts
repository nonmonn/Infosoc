import { RecorridoRespuesta } from '../interfaces/recorrido.interface';

// Diccionario indexado por "origen_destino"
export const RUTAS_HARDCODEADAS: Record<string, RecorridoRespuesta> = {
  'entrada_prin_bano_1': {
    version: 'v1',
    origen: 'Entrada Principal',
    destino: 'Baño 1 (Entrada)',
    distanciaTotal: 8,
    pasos: [
      {
        orden: 1,
        desde: 'Exterior / Acceso',
        hasta: 'Entrada Principal',
        pictograma: {
          codigo: 'picto_entrar',
          titulo: 'Entrar al hospital',
          imagenUrl: '/imagenes/pictogramas/entrar.svg',
        },
        texto: 'Ingresa por las puertas de vidrio de la entrada principal.',
        imagenes: [
          {
            url: '/imagenes/recorridos/bano1/frame1_entrada_01.jpg',
            alt: 'Vista frente a las puertas de vidrio de la entrada',
            marcadores: [
              {
                id: 'vehiculos_entrada',
                top: 48,
                left: 74,
                ladoGlobo: 'derecha',
                icono: '🚗',
                // imagenUrl: '/imagenes/pictogramas/vehiculos.svg',
                titulo: 'Precaución vehicular',
                descripcion: 'Cuidado con los vehículos que pueden pasar por el acceso.'
              }
            ]
          },
          {
            url: '/imagenes/recorridos/bano1/frame1_entrada_02.jpg',
            alt: 'Transición cruzando las puertas de entrada',
            marcadores: []
          }
        ],
      },
      {
        orden: 2,
        desde: 'Entrada Principal',
        hasta: 'Pasillo de Acceso',
        pictograma: {
          codigo: 'picto_frente',
          titulo: 'Avanzar de frente',
          imagenUrl: '/imagenes/pictogramas/frente.svg',
        },
        texto: 'Avanza unos pasos por el pasillo junto a la sala de espera.',
        imagenes: [
          {
            url: '/imagenes/recorridos/bano1/frame2_pasillo_01.jpg',
            alt: 'Vista del pasillo principal al costado de la entrada',
            marcadores: [
              {
                id: 'ruido_espera',
                top: 45,
                left: 35,
                ladoGlobo: 'derecha',
                icono: '🔊',
                // imagenUrl: '/imagenes/pictogramas/ruido.svg',
                titulo: 'Zona con ruido y personas',
                descripcion: 'Es probable que en la sala de espera haya más personas conversando y ruido ambiental.'
              }
            ]
          },
          {
            url: '/imagenes/recorridos/bano1/frame2_pasillo_02.jpg',
            alt: 'Transición acercándose al sector del baño',
            marcadores: []
          }
        ],
      },
      {
        orden: 3,
        desde: 'Pasillo de Acceso',
        hasta: 'Baño 1',
        pictograma: {
          codigo: 'picto_bano',
          titulo: 'Baño',
          imagenUrl: '/imagenes/pictogramas/bano.svg',
        },
        texto: 'A tu costado encontrarás la puerta del Baño 1. Has llegado a tu destino.',
        imagenes: [
          {
            url: '/imagenes/recorridos/bano1/frame3_bano_cerrado.jpg',
            alt: 'Vista frontal de la puerta del baño cerrada',
            marcadores: [
              {
                id: 'puerta_bano',
                top: 50,
                left: 33,
                ladoGlobo: 'derecha',
                icono: '🚻',
                titulo: 'Acceso al Baño 1',
                descripcion: 'Puerta de acceso directo sin escaleras.'
              }
            ]
          },
          {
            url: '/imagenes/recorridos/bano1/frame3_bano_abierto.jpg',
            alt: 'Transición con la puerta del baño abierta',
            marcadores: []
          },
          {
            url: '/imagenes/recorridos/bano1/frame3_bano_interior.jpg',
            alt: 'Vista interior del baño',
            marcadores: []
          }
        ],
      },
    ],
  },
};