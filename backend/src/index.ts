// Location: backend/src/index.ts
import express, { Application } from 'express';
import cors from 'cors';
import dictionaryRoutes from './routes/dictionary';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/dictionary', dictionaryRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Bishnupriya Dictionary API is running' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});