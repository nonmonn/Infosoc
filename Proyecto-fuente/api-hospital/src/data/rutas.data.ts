import { RecorridoRespuesta } from '../interfaces/recorrido.interface';

// Diccionario indexado por "origen_destino"
export const RUTAS_HARDCODEADAS: Record<string, RecorridoRespuesta> = {
  // ---------------------------------------------------------
  // R1 (Entrada): Entrada -> Baño 1 (Entrada)
  // ---------------------------------------------------------
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
                imagenUrl: '/imagenes/pictogramas/vehiculos.png',
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
                imagenUrl: '/imagenes/pictogramas/ruido.png',
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
                imagenUrl: '/imagenes/pictogramas/bano.png',
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

  // ---------------------------------------------------------
  // R1 (Pasillo): Entrada -> Baño 2 (Pasillo)
  // ---------------------------------------------------------
  'entrada_prin_bano_2': {
    version: 'v1',
    origen: 'Entrada Principal',
    destino: 'Baño 2 (Pasillo)',
    distanciaTotal: 15,
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
                imagenUrl: '/imagenes/pictogramas/vehiculos.png',
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
        hasta: 'Sala de Espera',
        pictograma: {
          codigo: 'picto_frente',
          titulo: 'Cruzar sala de espera',
          imagenUrl: '/imagenes/pictogramas/frente.svg',
        },
        texto: 'Camina derecho pasando por la sala de espera hasta el fondo.',
        imagenes: [
          {
            url: '/imagenes/recorridos/bano2/frame2_sala_espera.jpg',
            alt: 'Vista cruzando la sala de espera',
            marcadores: [
              {
                id: 'ruido_espera_bano2',
                top: 45,
                left: 35,
                ladoGlobo: 'derecha',
                icono: '🔊',
                imagenUrl: '/imagenes/pictogramas/ruido.png',
                titulo: 'Zona con ruido y personas',
                descripcion: 'Es probable que en la sala de espera haya personas conversando y ruido ambiental.'
              }
            ]
          }
        ],
      },
      {
        orden: 3,
        desde: 'Sala de Espera',
        hasta: 'Pasillo Lateral',
        pictograma: {
          codigo: 'picto_derecha',
          titulo: 'Doblar a la derecha',
          imagenUrl: '/imagenes/pictogramas/frente.svg',
        },
        texto: 'Dobla a la derecha y avanza un poco por el pasillo.',
        imagenes: [
          {
            url: '/imagenes/recorridos/bano2/frame3_pasillo_derecha.jpg',
            alt: 'Vista avanzando por el pasillo hacia la derecha',
            marcadores: []
          }
        ],
      },
      {
        orden: 4,
        desde: 'Pasillo Lateral',
        hasta: 'Baño 2 (Pasillo)',
        pictograma: {
          codigo: 'picto_bano',
          titulo: 'Baño',
          imagenUrl: '/imagenes/pictogramas/bano.svg',
        },
        texto: 'Dobla nuevamente a la derecha y quedarás frente a la puerta del Baño del Pasillo. Has llegado a tu destino.',
        imagenes: [
          {
            url: '/imagenes/recorridos/bano2/frame4_bano_cerrado.jpg',
            alt: 'Vista frontal de la puerta del baño del pasillo',
            marcadores: [
              {
                id: 'puerta_bano_pasillo',
                top: 50,
                left: 50,
                ladoGlobo: 'derecha',
                icono: '🚻',
                imagenUrl: '/imagenes/pictogramas/bano.png',
                titulo: 'Acceso al Baño 2 (Pasillo)',
                descripcion: 'Puerta de acceso directo al baño del pasillo.'
              }
            ]
          },
          {
            url: '/imagenes/recorridos/bano2/frame4_bano_abierto.jpg',
            alt: 'Puerta del baño del pasillo abierta',
            marcadores: []
          }
        ],
      },
    ],
  },

  // ---------------------------------------------------------
  // R3: Entrada -> Sala de espera: Recepción
  // ---------------------------------------------------------
  'entrada_prin_recepcion_1': {
    version: 'v1',
    origen: 'Entrada Principal',
    destino: 'Sala de Espera - Recepción',
    distanciaTotal: 6,
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
                imagenUrl: '/imagenes/pictogramas/vehiculos.png',
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
        hasta: 'Sala de Espera - Recepción',
        pictograma: {
          codigo: 'picto_informaciones',
          titulo: 'Recepción / Informaciones',
          imagenUrl: '/imagenes/pictogramas/informaciones.png',
        },
        texto: 'Avanza derecho hacia el interior. Llegarás directamente a la Sala de Espera y al mesón de Recepción.',
        imagenes: [
          {
            url: '/imagenes/recorridos/recepcion/frame2_sala_espera.jpg',
            alt: 'Vista de la sala de espera y mesón de recepción',
            marcadores: [
              {
                id: 'ruido_recepcion',
                top: 45,
                left: 35,
                ladoGlobo: 'derecha',
                icono: '🔊',
                imagenUrl: '/imagenes/pictogramas/ruido.png',
                titulo: 'Zona con ruido y personas',
                descripcion: 'En la sala de espera puede haber varias personas esperando atención.'
              },
              {
                id: 'meson_recepcion',
                top: 55,
                left: 65,
                ladoGlobo: 'izquierda',
                icono: 'ℹ️',
                imagenUrl: '/imagenes/pictogramas/informaciones.png',
                titulo: 'Mesón de Recepción',
                descripcion: 'Aquí puedes anunciar tu llegada o pedir ayuda al personal.'
              }
            ]
          }
        ],
      },
    ],
  },

  // ---------------------------------------------------------
  // R4: Entrada -> Entrega Recetas (Piso 1 -> Piso 2)
  // ---------------------------------------------------------
  'entrada_prin_entrega_recetas': {
    version: 'v1',
    origen: 'Entrada Principal',
    destino: 'Entrega Recetas (Piso 2)',
    distanciaTotal: 25,
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
                imagenUrl: '/imagenes/pictogramas/vehiculos.png',
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
        hasta: 'Escaleras (Piso 1)',
        pictograma: {
          codigo: 'picto_frente',
          titulo: 'Cruzar sala de espera',
          imagenUrl: '/imagenes/pictogramas/frente.svg',
        },
        texto: 'Cruza la sala de espera hacia el fondo y gira a la izquierda para dirigirte a las escaleras.',
        imagenes: [
          {
            url: '/imagenes/recorridos/recetas/frame2_hacia_escalera.jpg',
            alt: 'Camino cruzando la sala de espera hacia las escaleras',
            marcadores: [
              {
                id: 'ruido_espera_recetas',
                top: 45,
                left: 40,
                ladoGlobo: 'derecha',
                icono: '🔊',
                imagenUrl: '/imagenes/pictogramas/ruido.png',
                titulo: 'Zona con ruido',
                descripcion: 'Cruzarás por la sala de espera donde puede haber personas conversando.'
              }
            ]
          }
        ],
      },
      {
        orden: 3,
        desde: 'Escaleras (Piso 1)',
        hasta: 'Piso 2',
        pictograma: {
          codigo: 'picto_subir',
          titulo: 'Subir escaleras',
          imagenUrl: '/imagenes/pictogramas/frente.svg',
        },
        texto: 'Sube por las escaleras hasta llegar al segundo piso.',
        imagenes: [
          {
            url: '/imagenes/recorridos/recetas/frame3_escaleras.jpg',
            alt: 'Escaleras hacia el segundo piso',
            marcadores: []
          }
        ],
      },
      {
        orden: 4,
        desde: 'Acceso Piso 2',
        hasta: 'Pasillo Central (Piso 2)',
        pictograma: {
          codigo: 'picto_frente',
          titulo: 'Avanzar por pasillo',
          imagenUrl: '/imagenes/pictogramas/frente.svg',
        },
        texto: 'Al salir de las escaleras, avanza unos pasos, gira a la derecha y recorre todo el pasillo central entre los boxes.',
        imagenes: [
          {
            url: '/imagenes/recorridos/recetas/frame4_pasillo_piso2.jpg',
            alt: 'Pasillo central del segundo piso entre los boxes de atención',
            marcadores: []
          }
        ],
      },
      {
        orden: 5,
        desde: 'Pasillo Central (Piso 2)',
        hasta: 'Entrega Recetas',
        pictograma: {
          codigo: 'picto_informaciones',
          titulo: 'Entrega de Recetas',
          imagenUrl: '/imagenes/pictogramas/informaciones.png',
        },
        texto: 'Al final del pasillo gira a la derecha. Has llegado a la zona de Entrega de Recetas.',
        imagenes: [
          {
            url: '/imagenes/recorridos/recetas/frame5_recetas.jpg',
            alt: 'Llegada a la zona de Entrega de Recetas',
            marcadores: [
              {
                id: 'punto_recetas',
                top: 50,
                left: 50,
                ladoGlobo: 'izquierda',
                icono: '📋',
                imagenUrl: '/imagenes/pictogramas/informaciones.png',
                titulo: 'Entrega de Recetas',
                descripcion: 'Aquí puedes retirar o gestionar tus recetas médicas.'
              }
            ]
          }
        ],
      },
    ],
  },

  // ---------------------------------------------------------
  // R6 (BOX 1): Entrada -> BOX 1 (Piso 1 -> Piso 2)
  // ---------------------------------------------------------
  'entrada_prin_box_1': {
    version: 'v1',
    origen: 'Entrada Principal',
    destino: 'BOX 1 (Piso 2)',
    distanciaTotal: 22,
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
                imagenUrl: '/imagenes/pictogramas/vehiculos.png',
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
        hasta: 'Escaleras (Piso 1)',
        pictograma: {
          codigo: 'picto_frente',
          titulo: 'Cruzar sala de espera',
          imagenUrl: '/imagenes/pictogramas/frente.svg',
        },
        texto: 'Cruza la sala de espera hacia el fondo y gira a la izquierda para dirigirte a las escaleras.',
        imagenes: [
          {
            url: '/imagenes/recorridos/recetas/frame2_hacia_escalera.jpg',
            alt: 'Camino cruzando la sala de espera hacia las escaleras',
            marcadores: [
              {
                id: 'ruido_espera_box1',
                top: 45,
                left: 40,
                ladoGlobo: 'derecha',
                icono: '🔊',
                imagenUrl: '/imagenes/pictogramas/ruido.png',
                titulo: 'Zona con ruido',
                descripcion: 'Cruzarás por la sala de espera donde puede haber personas conversando.'
              }
            ]
          }
        ],
      },
      {
        orden: 3,
        desde: 'Escaleras (Piso 1)',
        hasta: 'Piso 2',
        pictograma: {
          codigo: 'picto_subir',
          titulo: 'Subir escaleras',
          imagenUrl: '/imagenes/pictogramas/frente.svg',
        },
        texto: 'Sube por las escaleras hasta llegar al segundo piso.',
        imagenes: [
          {
            url: '/imagenes/recorridos/recetas/frame3_escaleras.jpg',
            alt: 'Escaleras hacia el segundo piso',
            marcadores: []
          }
        ],
      },
      {
        orden: 4,
        desde: 'Acceso Piso 2',
        hasta: 'Pasillo Central (Piso 2)',
        pictograma: {
          codigo: 'picto_frente',
          titulo: 'Avanzar por pasillo',
          imagenUrl: '/imagenes/pictogramas/frente.svg',
        },
        texto: 'Al salir de las escaleras, avanza unos pasos, gira a la derecha y recorre el pasillo central casi hasta el final.',
        imagenes: [
          {
            url: '/imagenes/recorridos/box1/frame4_pasillo_piso2.jpg',
            alt: 'Pasillo central del segundo piso hacia el BOX 1',
            marcadores: []
          }
        ],
      },
      {
        orden: 5,
        desde: 'Pasillo Central (Piso 2)',
        hasta: 'BOX 1',
        pictograma: {
          codigo: 'picto_box',
          titulo: 'BOX 1',
          imagenUrl: '/imagenes/pictogramas/boxes.png',
        },
        texto: 'Gira a tu derecha y quedarás frente a la puerta del BOX 1. Has llegado a tu destino.',
        imagenes: [
          {
            url: '/imagenes/recorridos/box1/frame5_box1.jpg',
            alt: 'Puerta de acceso al BOX 1',
            marcadores: [
              {
                id: 'puerta_box1',
                top: 50,
                left: 50,
                ladoGlobo: 'izquierda',
                icono: '🩺',
                imagenUrl: '/imagenes/pictogramas/boxes.png',
                titulo: 'BOX 1',
                descripcion: 'Sala de atención médica. Espera a ser llamado o toca la puerta si te indicaron pasar.'
              }
            ]
          }
        ],
      },
    ],
  },

  // ---------------------------------------------------------
  // R6 (BOX 2): Entrada -> BOX 2 (Piso 1 -> Piso 2)
  // ---------------------------------------------------------
  'entrada_prin_box_2': {
    version: 'v1',
    origen: 'Entrada Principal',
    destino: 'BOX 2 (Piso 2)',
    distanciaTotal: 20,
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
                imagenUrl: '/imagenes/pictogramas/vehiculos.png',
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
        hasta: 'Escaleras (Piso 1)',
        pictograma: {
          codigo: 'picto_frente',
          titulo: 'Cruzar sala de espera',
          imagenUrl: '/imagenes/pictogramas/frente.svg',
        },
        texto: 'Cruza la sala de espera hacia el fondo y gira a la izquierda para dirigirte a las escaleras.',
        imagenes: [
          {
            url: '/imagenes/recorridos/recetas/frame2_hacia_escalera.jpg',
            alt: 'Camino cruzando la sala de espera hacia las escaleras',
            marcadores: [
              {
                id: 'ruido_espera_box2',
                top: 45,
                left: 40,
                ladoGlobo: 'derecha',
                icono: '🔊',
                imagenUrl: '/imagenes/pictogramas/ruido.png',
                titulo: 'Zona con ruido',
                descripcion: 'Cruzarás por la sala de espera donde puede haber personas conversando.'
              }
            ]
          }
        ],
      },
      {
        orden: 3,
        desde: 'Escaleras (Piso 1)',
        hasta: 'Piso 2',
        pictograma: {
          codigo: 'picto_subir',
          titulo: 'Subir escaleras',
          imagenUrl: '/imagenes/pictogramas/frente.svg',
        },
        texto: 'Sube por las escaleras hasta llegar al segundo piso.',
        imagenes: [
          {
            url: '/imagenes/recorridos/recetas/frame3_escaleras.jpg',
            alt: 'Escaleras hacia el segundo piso',
            marcadores: []
          }
        ],
      },
      {
        orden: 4,
        desde: 'Acceso Piso 2',
        hasta: 'Pasillo Central (Piso 2)',
        pictograma: {
          codigo: 'picto_frente',
          titulo: 'Avanzar por pasillo',
          imagenUrl: '/imagenes/pictogramas/frente.svg',
        },
        texto: 'Al salir de las escaleras, avanza unos pasos, gira a la derecha y camina hasta la mitad del pasillo central.',
        imagenes: [
          {
            url: '/imagenes/recorridos/box2/frame4_pasillo_piso2.jpg',
            alt: 'Pasillo central del segundo piso hacia el BOX 2',
            marcadores: []
          }
        ],
      },
      {
        orden: 5,
        desde: 'Pasillo Central (Piso 2)',
        hasta: 'BOX 2',
        pictograma: {
          codigo: 'picto_box',
          titulo: 'BOX 2',
          imagenUrl: '/imagenes/pictogramas/boxes.png',
        },
        texto: 'Gira a tu izquierda y quedarás frente a la puerta del BOX 2. Has llegado a tu destino.',
        imagenes: [
          {
            url: '/imagenes/recorridos/box2/frame5_box2.jpg',
            alt: 'Puerta de acceso al BOX 2',
            marcadores: [
              {
                id: 'puerta_box2',
                top: 50,
                left: 50,
                ladoGlobo: 'derecha',
                icono: '🩺',
                imagenUrl: '/imagenes/pictogramas/boxes.png',
                titulo: 'BOX 2',
                descripcion: 'Sala de atención médica. Espera a ser llamado o toca la puerta si te indicaron pasar.'
              }
            ]
          }
        ],
      },
    ],
  },

  // ---------------------------------------------------------
  // R6 (BOX Procedimientos): Entrada -> BOX Procedimientos (Piso 1 -> Piso 2)
  // ---------------------------------------------------------
  'entrada_prin_box_procedimientos': {
    version: 'v1',
    origen: 'Entrada Principal',
    destino: 'BOX Procedimientos (Piso 2)',
    distanciaTotal: 22,
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
                imagenUrl: '/imagenes/pictogramas/vehiculos.png',
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
        hasta: 'Escaleras (Piso 1)',
        pictograma: {
          codigo: 'picto_frente',
          titulo: 'Cruzar sala de espera',
          imagenUrl: '/imagenes/pictogramas/frente.svg',
        },
        texto: 'Cruza la sala de espera hacia el fondo y gira a la izquierda para dirigirte a las escaleras.',
        imagenes: [
          {
            url: '/imagenes/recorridos/recetas/frame2_hacia_escalera.jpg',
            alt: 'Camino cruzando la sala de espera hacia las escaleras',
            marcadores: [
              {
                id: 'ruido_espera_proc',
                top: 45,
                left: 40,
                ladoGlobo: 'derecha',
                icono: '🔊',
                imagenUrl: '/imagenes/pictogramas/ruido.png',
                titulo: 'Zona con ruido',
                descripcion: 'Cruzarás por la sala de espera donde puede haber personas conversando.'
              }
            ]
          }
        ],
      },
      {
        orden: 3,
        desde: 'Escaleras (Piso 1)',
        hasta: 'Piso 2',
        pictograma: {
          codigo: 'picto_subir',
          titulo: 'Subir escaleras',
          imagenUrl: '/imagenes/pictogramas/frente.svg',
        },
        texto: 'Sube por las escaleras hasta llegar al segundo piso.',
        imagenes: [
          {
            url: '/imagenes/recorridos/recetas/frame3_escaleras.jpg',
            alt: 'Escaleras hacia el segundo piso',
            marcadores: []
          }
        ],
      },
      {
        orden: 4,
        desde: 'Acceso Piso 2',
        hasta: 'Pasillo Central (Piso 2)',
        pictograma: {
          codigo: 'picto_frente',
          titulo: 'Avanzar por pasillo',
          imagenUrl: '/imagenes/pictogramas/frente.svg',
        },
        texto: 'Al salir de las escaleras, avanza unos pasos, gira a la derecha y recorre el pasillo central casi hasta el final.',
        imagenes: [
          {
            url: '/imagenes/recorridos/box_procedimientos/frame4_pasillo_piso2.jpg',
            alt: 'Pasillo central del segundo piso hacia el BOX Procedimientos',
            marcadores: []
          }
        ],
      },
      {
        orden: 5,
        desde: 'Pasillo Central (Piso 2)',
        hasta: 'BOX Procedimientos',
        pictograma: {
          codigo: 'picto_box',
          titulo: 'BOX Procedimientos',
          imagenUrl: '/imagenes/pictogramas/boxes.png',
        },
        texto: 'Gira a tu izquierda y quedarás frente a la puerta del BOX de Procedimientos (exámenes e inyecciones). Has llegado a tu destino.',
        imagenes: [
          {
            url: '/imagenes/recorridos/box_procedimientos/frame5_box_procedimientos.jpg',
            alt: 'Puerta de acceso al BOX Procedimientos',
            marcadores: [
              {
                id: 'puerta_box_proc',
                top: 50,
                left: 50,
                ladoGlobo: 'derecha',
                icono: '🩺',
                imagenUrl: '/imagenes/pictogramas/boxes.png',
                titulo: 'BOX Procedimientos',
                descripcion: 'Sala de procedimientos, exámenes e inyecciones. Espera a ser llamado por el personal.'
              }
            ]
          }
        ],
      },
    ],
  },
};