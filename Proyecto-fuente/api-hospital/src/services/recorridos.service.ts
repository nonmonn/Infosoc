import { HttpError } from '../helpers/http-error';
import { RecorridoRespuesta } from '../interfaces/recorrido.interface';
import { RUTAS_HARDCODEADAS } from '../data/rutas.data';

export async function calcularRecorrido(
  origenCodigo: string,
  destinoCodigo: string,
  _accesible: boolean
): Promise<RecorridoRespuesta> {
  const claveRuta = `${origenCodigo}_${destinoCodigo}`;
  const recorrido = RUTAS_HARDCODEADAS[claveRuta];

  if (!recorrido) {
    throw new HttpError(404, `No existe una ruta configurada desde "${origenCodigo}" hasta "${destinoCodigo}"`);
  }

  return recorrido;
}