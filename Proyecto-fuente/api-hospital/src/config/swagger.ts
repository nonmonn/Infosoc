import swaggerJsdoc from 'swagger-jsdoc';
export const swaggerSpec = swaggerJsdoc({
  definition: { openapi: '3.0.0', info: { title: 'API Recorridos', version: '1.0.0' } },
  apis: ['./src/routes/*.ts'],        // en producción compilada, apunta a ./dist/routes/*.js
});
// app.ts: app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));