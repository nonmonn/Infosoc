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
          { url: '/imagenes/recorridos/bano1/frame1_entrada_01.webp', alt: 'Vista frente a las puertas de vidrio de la entrada' },
          { url: '/imagenes/recorridos/bano1/frame1_entrada_02.webp', alt: 'Transición cruzando las puertas de entrada' }
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
          { url: '/imagenes/recorridos/bano1/frame2_pasillo_01.webp', alt: 'Vista del pasillo principal al costado de la entrada' },
          { url: '/imagenes/recorridos/bano1/frame2_pasillo_02.webp', alt: 'Transición acercándose al sector del baño' }
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
          { url: '/imagenes/recorridos/bano1/frame3_bano_cerrado.webp', alt: 'Vista frontal de la puerta del baño cerrada' },
          { url: '/imagenes/recorridos/bano1/frame3_bano_abierto.webp', alt: 'Transición con la puerta del baño abierta' },
          { url: '/imagenes/recorridos/bano1/frame3_bano_interior.webp', alt: 'Vista interior del baño' }
        ],
      },
    ],
  },
};