import express from 'express';
import cors from 'cors';
import path from 'path';
import perfilRoutes from './routes';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, '..')));

// Rotas da API
app.use(perfilRoutes);

// Rota padrão
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
