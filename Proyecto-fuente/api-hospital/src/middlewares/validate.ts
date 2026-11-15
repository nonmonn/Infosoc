import { RequestHandler } from 'express';
import { ZodSchema } from 'zod';

export const validateQuery = (schema: ZodSchema): RequestHandler => (req, res, next) => {
  const r = schema.safeParse(req.query);
  if (!r.success) return res.status(400).json({ error: 'Parámetros inválidos', detalles: r.error.flatten().fieldErrors });
  res.locals.query = r.data;          // se guarda aquí porque en Express 5 req.query es de solo lectura
  next();
};