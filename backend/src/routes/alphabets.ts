import { Router, Request, Response } from 'express';
import { getAllAlphabets, getWordsByAlphabet } from '../utils/alphabetHelper';

const router = Router();

/**
 * GET /api/alphabets
 * Get all available Bishnupriya alphabets
 */
router.get('/', (req: Request, res: Response) => {
    try {
        const alphabets = getAllAlphabets();
        res.json({
            success: true,
            count: alphabets.length,
            data: alphabets
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve alphabets'
        });
    }
});

/**
 * GET /api/alphabets/:letter
 * Get all words starting with a specific alphabet
 */
router.get('/:letter', (req: Request, res: Response) => {
    const { letter } = req.params;

    try {
        const words = getWordsByAlphabet(letter);

        if (words.length === 0) {
            return res.status(404).json({
                success: false,
                error: `No words found for alphabet: ${letter}`
            });
        }

        res.json({
            success: true,
            alphabet: letter,
            count: words.length,
            data: words
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve words for alphabet'
        });
    }
});

export default router;