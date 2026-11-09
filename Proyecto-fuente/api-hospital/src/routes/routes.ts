import { Router } from 'express';
import { obtenerRuta } from '../controllers/ruta.controller.js';

const router = Router();
router.get('/api/rutas/calcular', obtenerRuta);

export default router;

