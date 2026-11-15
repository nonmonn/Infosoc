import { grafoRepository as repo } from '../repositories/grafo.repository';
import { rutaMasCorta } from '../helpers/dijkstra';
import { HttpError } from '../helpers/http-error';
import { RecorridoRespuesta } from '../interfaces/recorrido.interface';

export async function calcularRecorrido(
  origenCodigo: string, 
  destinoCodigo: string, 
  accesible: boolean
): Promise<RecorridoRespuesta> {
  
  const [o, d] = await Promise.all([
    repo.nodoPorCodigo(origenCodigo), 
    repo.nodoPorCodigo(destinoCodigo)
  ]);
  
  if (!o || !d) throw new HttpError(404, 'El origen o el destino no existe');

  const aristas = await repo.aristasActivas();
  const ids = rutaMasCorta(aristas, o.id, d.id, accesible);
  
  if (!ids) throw new HttpError(404, accesible ? 'No hay una ruta accesible a ese destino' : 'No hay ruta a ese destino');

  const detalle = await repo.aristasConFotos(ids);
  const porId = new Map(detalle.map((a) => [a.id, a]));

  const pasos = ids.map((id, i) => {
    const a = porId.get(id)!;
    const primera = a.tramos[0]; // la 1.ª foto define el pictograma y el texto del paso
    
    return {
      orden: i + 1,
      desde: a.origen.nombre,
      hasta: a.destino.nombre,
      pictograma: primera ? { 
        codigo: primera.pictograma.id.toString(), // Usamos el ID del pictograma como código
        titulo: primera.pictograma.titulo, 
        imagenUrl: primera.pictograma.imagenUrl 
      } : null,
      texto: primera?.instruccion ?? `Dirígete a ${a.destino.nombre}`,
      // Usamos la instrucción como texto alternativo (alt) de la imagen
      imagenes: a.tramos.map((t) => ({ url: t.imagenUrl, alt: t.instruccion })), 
    };
  });

  return {
    version: process.env.RECORRIDOS_VERSION ?? 'v1',
    origen: o.nombre, 
    destino: d.nombre,
    distanciaTotal: Math.round(aristas.filter((a) => ids.includes(a.id)).reduce((s, a) => s + a.distancia, 0)),
    pasos,
  };
}