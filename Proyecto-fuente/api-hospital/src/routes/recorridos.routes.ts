import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { validateQuery } from '../middlewares/validate';
import { recorridoQuerySchema } from '../interfaces/recorrido.schema';
import { getRecorrido } from '../controllers/recorridos.controller';

const router = Router();
const limiter = rateLimit({ windowMs: 60_000, limit: 60 });   // holgado: es una consulta liviana

/**
 * @openapi
 * /api/recorridos:
 *   get:
 *     tags: [Recorridos]
 *     summary: Calcula la ruta entre dos puntos del hospital
 *     parameters:
 *       - { in: query, name: origen,   required: true,  schema: { type: string }, example: ent }
 *       - { in: query, name: destino,  required: true,  schema: { type: string }, example: bano }
 *       - { in: query, name: accesible, schema: { type: boolean, default: false }, description: Evita escaleras }
 *     responses:
 *       200: { description: Pasos con pictogramas e imágenes }
 *       400: { description: Parámetros inválidos }
 *       404: { description: Origen/destino inexistente o sin ruta }
 */
router.get('/', limiter, validateQuery(recorridoQuerySchema), getRecorrido);
export default router;