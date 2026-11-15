import { prisma } from '../prisma/client';

export const grafoRepository = {
  // Busca un nodo por su ID exacto, sin el filtro de activo
  nodoPorCodigo: (id: string) =>
    prisma.nodo.findUnique({ 
      where: { id } 
    }),

  // Trae todas las aristas sin filtrar por activo
  aristasActivas: () =>
    prisma.arista.findMany(),

  // Trae las aristas con la información de origen, destino y sus fotos (tramos) ordenadas
  aristasConFotos: (ids: number[]) =>
    prisma.arista.findMany({
      where: { id: { in: ids } },
      include: {
        origen: true, 
        destino: true,
        tramos: { 
          orderBy: { orden: 'asc' }, 
          include: { pictograma: true } 
        },
      },
    }),
};