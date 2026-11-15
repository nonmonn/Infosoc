import { ErrorRequestHandler } from 'express';
import { HttpError } from '../helpers/http-error';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof HttpError) return res.status(err.status).json({ error: err.message });
  console.error(err);
  res.status(500).json({ error: 'Error interno' });
};