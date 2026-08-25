const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Registro do módulo de rotas
app.use('/users', userRoutes);

app.get('/health', (req, res) => {
  return res.status(200).json({ status: 'OK', message: 'API Connect operacional.' });
});

app.listen(PORT, () => {
  console.log(`[API Connect] Servidor executando na porta ${PORT}`);
});
