import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Iniciando la carga de datos de prueba...');

  // 1. Crear Pictogramas (Iconos)
  const pictoFrente = await prisma.pictograma.create({
    data: { titulo: 'Avanzar de frente', imagenUrl: '/assets/icons/frente.svg' }
  });
  const pictoDerecha = await prisma.pictograma.create({
    data: { titulo: 'Girar a la derecha', imagenUrl: '/assets/icons/derecha.svg' }
  });

  // 2. Crear Nodos (Puntos del hospital)
  const entrada = await prisma.nodo.create({
    data: { id: 'entrada_prin', nombre: 'Entrada Principal', piso: 1, esDestino: false }
  });
  const pasilloA = await prisma.nodo.create({
    data: { id: 'pasillo_a_medio', nombre: 'Mitad del Pasillo A', piso: 1, esDestino: false }
  });
  const bano1 = await prisma.nodo.create({
    data: { id: 'bano_1', nombre: 'Baño Sector A', piso: 1, esDestino: true }
  });

  // 3. Crear Aristas (Las conexiones entre los nodos)
  const arista1 = await prisma.arista.create({
    data: { origenId: entrada.id, destinoId: pasilloA.id, distancia: 5.0, accesible: true }
  });
  const arista2 = await prisma.arista.create({
    data: { origenId: pasilloA.id, destinoId: bano1.id, distancia: 3.0, accesible: true }
  });

  // 4. Crear los Tramos (Las "fotos" del Stop Motion para cada pasillo)

  // Fotos para el primer tramo (Entrada -> Mitad del pasillo)
  await prisma.tramo.createMany({
    data: [
      { aristaId: arista1.id, orden: 1, imagenUrl: '/assets/recorridos/ext-ent_01.webp', instruccion: 'Ingresa por la puerta principal', idPictograma: pictoFrente.id },
      { aristaId: arista1.id, orden: 2, imagenUrl: '/assets/recorridos/ext-ent_02.webp', instruccion: 'Avanza por el pasillo principal', idPictograma: pictoFrente.id }
    ]
  });

  // Fotos para el segundo tramo (Mitad del pasillo -> Baño)
  await prisma.tramo.createMany({
    data: [
      { aristaId: arista2.id, orden: 1, imagenUrl: '/assets/recorridos/pas-bano_01.webp', instruccion: 'Gira a la derecha hacia los baños', idPictograma: pictoDerecha.id },
      { aristaId: arista2.id, orden: 2, imagenUrl: '/assets/recorridos/pas-bano_02.webp', instruccion: 'Has llegado a tu destino', idPictograma: pictoFrente.id }
    ]
  });

  console.log('¡Datos cargados correctamente!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });