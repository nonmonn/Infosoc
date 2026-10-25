import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor del Hospital en línea');
});

app.get('/api/estado', (req, res) => {
  res.json({ mensaje: 'API del Hospital funcionando correctamente' });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});