import express from 'express';
import cors from 'cors';
import routes from './routes/index';
import { errorHandler } from './middlewares/error-handler';
import { swaggerSpec } from './config/swagger';
import swaggerUi from 'swagger-ui-express';

const app = express();
const port = process.env.PORT || 3000;

// Middlewares base
app.use(cors()); // Permite que tu PWA en Angular (puerto 4200) consulte esta API
app.use(express.json());

// Documentación Swagger
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Montar todas las rutas
app.use('/api', routes);

// Manejador de errores (DEBE ir siempre al final)
app.use(errorHandler);

// Iniciar servidor
app.listen(port, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${port}`);
  console.log(`📄 Documentación (Swagger) en http://localhost:${port}/api/docs`);
});