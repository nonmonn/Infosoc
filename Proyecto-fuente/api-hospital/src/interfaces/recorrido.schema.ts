import { z } from 'zod';

export const recorridoQuerySchema = z
  .object({
    origen: z.string().trim().min(1).max(50),
    destino: z.string().trim().min(1).max(50),
    // OJO: no uses z.coerce.boolean(): convierte el texto "false" en true
    accesible: z.enum(['true', 'false']).default('false').transform((v) => v === 'true'),
  })
  .refine((d) => d.origen !== d.destino, {
    message: 'origen y destino deben ser distintos',
    path: ['destino'],
  });

export type RecorridoQuery = z.infer<typeof recorridoQuerySchema>;