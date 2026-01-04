"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Location: backend/src/routes/dictionary.ts
const express_1 = require("express");
const alphabetHelper_1 = require("../utils/alphabetHelper");
const router = (0, express_1.Router)();
/**
 * GET /api/dictionary/words
 * Get all words from all alphabet files
 */
router.get('/words', (req, res) => {
    try {
        const words = (0, alphabetHelper_1.getAllWords)();
        res.json({
            success: true,
            count: words.length,
            data: words
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve words'
        });
    }
});
/**
 * GET /api/dictionary/search?term=জাকা&language=bpy
 * Search for words - automatically finds the correct alphabet file
 */
router.get('/search', (req, res) => {
    const { term, language } = req.query;
    if (!term || !language) {
        return res.status(400).json({
            success: false,
            error: 'Term and language are required'
        });
    }
    const lang = language;
    if (!['bpy', 'bn', 'en'].includes(lang)) {
        return res.status(400).json({
            success: false,
            error: 'Language must be one of: bpy, bn, en'
        });
    }
    try {
        const results = (0, alphabetHelper_1.searchWordInAlphabets)(term, lang);
        res.json({
            success: true,
            count: results.length,
            searchTerm: term,
            language: lang,
            data: results
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: 'Search failed'
        });
    }
});
/**
 * GET /api/dictionary/word/:id
 * Get a specific word by ID
 */
router.get('/word/:id', (req, res) => {
    const { id } = req.params;
    try {
        const word = (0, alphabetHelper_1.getWordById)(id);
        if (!word) {
            return res.status(404).json({
                success: false,
                error: 'Word not found'
            });
        }
        res.json({
            success: true,
            data: word
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve word'
        });
    }
});
/**
 * GET /api/dictionary/alphabets
 * Get all available alphabets
 */
router.get('/alphabets', (req, res) => {
    try {
        const alphabets = (0, alphabetHelper_1.getAllAlphabets)();
        res.json({
            success: true,
            count: alphabets.length,
            data: alphabets
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve alphabets'
        });
    }
});
/**
 * GET /api/dictionary/alphabet/:letter
 * Get all words starting with a specific alphabet
 */
router.get('/alphabet/:letter', (req, res) => {
    const { letter } = req.params;
    try {
        const words = (0, alphabetHelper_1.getWordsByAlphabet)(letter);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve words for alphabet'
        });
    }
});
exports.default = router;
