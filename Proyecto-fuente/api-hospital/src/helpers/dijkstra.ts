import { AristaGrafo } from '../interfaces/recorrido.interface';

/** Devuelve los ids de las aristas del camino más corto, o null si no hay camino. */
export function rutaMasCorta(
  aristas: AristaGrafo[], 
  origen: string, 
  destino: string, 
  soloAccesible: boolean
): number[] | null {
  const ady = new Map<string, AristaGrafo[]>();
  
  for (const a of aristas) {
    if (soloAccesible && !a.accesible) continue;
    if (!ady.has(a.origenId)) ady.set(a.origenId, []);
    ady.get(a.origenId)!.push(a);
  }
  
  const dist = new Map<string, number>([[origen, 0]]);
  const prev = new Map<string, AristaGrafo>();
  const pend = new Set<string>([origen]);
  const hechos = new Set<string>();

  while (pend.size) {
    let u = ""; 
    let mejor = Infinity;
    
    for (const n of pend) { 
      const d = dist.get(n)!; 
      if (d < mejor) { 
        mejor = d; 
        u = n; 
      } 
    }
    
    pend.delete(u);
    if (u === destino) break;
    hechos.add(u);
    
    for (const a of ady.get(u) ?? []) {
      if (hechos.has(a.destinoId)) continue;
      const nd = mejor + a.distancia;
      
      if (nd < (dist.get(a.destinoId) ?? Infinity)) {
        dist.set(a.destinoId, nd); 
        prev.set(a.destinoId, a); 
        pend.add(a.destinoId);
      }
    }
  }
  
  if (!prev.has(destino)) return null;
  
  const ids: number[] = [];
  let c = destino;
  
  while (c !== origen) { 
    const a = prev.get(c)!; 
    ids.unshift(a.id); 
    c = a.origenId; 
  }
  
  return ids;
}