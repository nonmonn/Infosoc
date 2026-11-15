import { Router } from 'express';
import recorridos from './recorridos.routes';

const router = Router();

router.use('/recorridos', recorridos);

export default router;