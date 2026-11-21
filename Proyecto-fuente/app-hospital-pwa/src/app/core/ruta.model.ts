export interface Paso {
  titulo: string;
  imagenUrl: string;
  pictogramaUrl: string;
  zonaRuidosa: boolean;
}

export interface Ruta {
  id: string;
  nombre: string;
  origen: string;
  destino: string;
  sinEscaleras: boolean;
  pasos: Paso[];
}

export interface RutaGuardada {
  id: string;
  nombre: string;
  origen: string;
  destino: string;
  accesibilidad: boolean;
  pasos: any[];
  fechaGuardado: string;
}