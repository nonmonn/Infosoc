import { PrismaClient, Nodo, Arista } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * Voy a hacer un dijkstra para poder calcular la ruta mas corta entre los nodos :p
 * 
 */

export async function calcularRutaOptima(origenId:number, destinoId: number, requiereAccesibilidad:boolean=false) {
   const nodos = await prisma.nodo.findMany();

   const aristas = await prisma.arista.findMany({
    where: requiereAccesibilidad ? { accesible: true } : {},
    include: {
        tramos: {
            orderBy: { orden: 'asc'},
            include: { pictograma: true}
        }
    }
   });

   const grafo = new Map();
   nodos.forEach(n => grafo.set(n.id, []));

   aristas.forEach(arista => {
    grafo.get(arista.origenId).push({
        nodoDestino: arista.destinoId,
        peso: arista.distancia,
        aristaCompleta: arista
    });
   });


   const distancias = new Map<number, number>();
   const nodosPrevios = new Map<Number, any>();
   const noVisitados = new Set<number>();

   nodos.forEach(n => {
    distancias.set(n.id, Infinity);
    noVisitados.add(n.id);
   });
   distancias.set(origenId, 0);


   while(noVisitados.size > 0){
    let nodoActual: number | null = null;
    let distMinima = Infinity;

    for(const id of noVisitados){
        if(distancias.get(id)! < distMinima){
            distMinima = distancias.get(id)!;
            nodoActual = id;
        }
    }

    if(nodoActual === null || nodoActual === destinoId) break;

    noVisitados.delete(nodoActual);

    const vecinos = grafo.get(nodoActual) || [];
    for(const vecino of vecinos){
        if(noVisitados.has(vecino.nodoDestino)){
            const nuevaDistancia = distancias.get(nodoActual)! + vecino.peso;
            
            if(nuevaDistancia < distancias.get(vecino.nodoDestino)!){
                distancias.set(vecino.nodoDestino, nuevaDistancia);
                nodosPrevios.set(vecino.nodoDestino, {
                    nodoId: nodoActual,
                    arista: vecino.aristaCompleta
                });
            }
        }
    }
   }

   const rutaFinal = [];
   let pasoActual = destinoId;
   if(nodosPrevios.has(pasoActual) || pasoActual === origenId){
    while(pasoActual !== origenId){
        const pasoPrevio = nodosPrevios.get(pasoActual);
        rutaFinal.unshift(pasoPrevio.arista);
        pasoActual = pasoPrevio.nodoId;
    }
   }else{
    throw new Error("No hay un camino posible entre estos dos puntos.");
   }
   const instruccionesFront = rutaFinal.flatMap(arista => arista.tramos);

   return{
    distanciaTotal: distancias.get(destinoId),
    instrucciones: instruccionesFront
   };

}