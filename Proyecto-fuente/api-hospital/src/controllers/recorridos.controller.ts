import { RequestHandler } from 'express';
import { calcularRecorrido } from '../services/recorridos.service';

export const getRecorrido: RequestHandler = async (_req, res, next) => {
  try {
    const { origen, destino, accesible } = res.locals.query;
    res.json(await calcularRecorrido(origen, destino, accesible));
  } catch (e) { next(e); }
};