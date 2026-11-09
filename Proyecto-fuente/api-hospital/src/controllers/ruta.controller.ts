import { Request, Response} from 'express';
import { calcularRutaOptima } from '../services/ruta.service.js';

export const obtenerRuta = async (req: Request, res: Response) => {
    try{
        const origenId = parseInt(req.query.origen as string);
        const destinoId = parseInt(req.query.destino as string);
        const accesible = req.query.accesible === 'true';

        if(!origenId || !destinoId){
            return res.status(400).json({ error: 'Faltan los parametros de origen y destino.'});
        }

        const resultado = await calcularRutaOptima(origenId, destinoId, accesible);

        res.json(resultado);
    }catch (error){
        console.error(error);
        res.status(500).json({ error: 'No se encontró un camino o hubo un error en el servidor.'});
    }
};