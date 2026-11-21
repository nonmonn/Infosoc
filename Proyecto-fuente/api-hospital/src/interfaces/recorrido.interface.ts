export interface MarcadorSensorial {
  id: string;
  top: number;        // Porcentaje desde arriba (0 a 100)
  left: number;       // Porcentaje desde la izquierda (0 a 100)
  ladoGlobo?: 'izquierda' | 'derecha'; // Hacia dónde abre el globo para que no se salga de la foto
  icono?: string;     // Emoji o fallback si no hay imagen
  imagenUrl?: string; // Ruta a tu pictograma ARASAAC en /imagenes/pictogramas/...
  titulo: string;
  descripcion: string;
}

export interface PasoRecorrido {
  orden: number;
  desde: string;
  hasta: string;
  pictograma: { codigo: string; titulo: string; imagenUrl: string } | null;
  texto: string;
  imagenes: { 
    url: string; 
    alt: string | null;
    marcadores?: MarcadorSensorial[]; 
  }[];
}

export interface RecorridoRespuesta {
  version: string;
  origen: string;
  destino: string;
  distanciaTotal: number;
  pasos: PasoRecorrido[];
}