// Location: backend/src/routes/dictionary.ts
import { Router, Request, Response } from 'express';
import { words } from '../data/words';
import { Word } from '../types';

const router = Router();

router.get('/words', (req: Request, res: Response) => {
    res.json(words);
});

router.get('/search', (req: Request, res: Response) => {
    const { term, language } = req.query;

    if (!term || !language) {
        return res.status(400).json({ error: 'Term and language are required' });
    }

    const searchTerm = (term as string).toLowerCase();
    const lang = language as 'bishnupriya' | 'bengali' | 'english';

    const results = words.filter((word: Word) =>
        word[lang].toLowerCase().includes(searchTerm)
    );

    res.json(results);
});

router.get('/word/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const word = words.find(w => w.id === id);

    if (!word) {
        return res.status(404).json({ error: 'Word not found' });
    }

    res.json(word);
});

export default router;