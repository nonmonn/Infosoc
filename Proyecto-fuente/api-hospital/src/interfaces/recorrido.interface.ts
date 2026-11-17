export interface PasoRecorrido {
  orden: number;
  desde: string;
  hasta: string;
  pictograma: { codigo: string; titulo: string; imagenUrl: string } | null;
  texto: string;
  imagenes: { url: string; alt: string | null }[];
}

export interface RecorridoRespuesta {
  version: string;
  origen: string;
  destino: string;
  distanciaTotal: number;
  pasos: PasoRecorrido[];
}