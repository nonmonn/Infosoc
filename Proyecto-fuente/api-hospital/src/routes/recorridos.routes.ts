import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { validateQuery } from '../middlewares/validate';
import { recorridoQuerySchema } from '../interfaces/recorrido.schema';
import { getRecorrido } from '../controllers/recorridos.controller';

const router = Router();
const limiter = rateLimit({ windowMs: 60_000, limit: 60 });

/**
 * @openapi
 * /api/recorridos:
 *   get:
 *     tags: [Recorridos]
 *     summary: Obtiene la ruta predefinida entre dos puntos del hospital
 *     parameters:
 *       - { in: query, name: origen, required: true, schema: { type: string }, example: entrada_prin }
 *       - { in: query, name: destino, required: true, schema: { type: string }, example: bano_1 }
 *       - { in: query, name: accesible, schema: { type: boolean, default: false }, description: Evita escaleras }
 *     responses:
 *       200: { description: Pasos con pictogramas e imágenes }
 *       400: { description: Parámetros inválidos }
 *       404: { description: Origen/destino inexistente o sin ruta }
 */
router.get('/', limiter, validateQuery(recorridoQuerySchema), getRecorrido);

export default router;