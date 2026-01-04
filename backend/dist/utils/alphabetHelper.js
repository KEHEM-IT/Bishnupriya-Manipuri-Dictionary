"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirstCharacter = getFirstCharacter;
exports.getAlphabetFileName = getAlphabetFileName;
exports.loadAlphabetFile = loadAlphabetFile;
exports.searchWordInAlphabets = searchWordInAlphabets;
exports.getWordById = getWordById;
exports.getAllWords = getAllWords;
exports.getAllAlphabets = getAllAlphabets;
exports.getWordsByAlphabet = getWordsByAlphabet;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const crypto = __importStar(require("crypto"));
// Bishnupriya Manipuri alphabets mapping
const ALPHABET_MAP = {
    'অ': 'অ.json', 'আ': 'আ.json', 'ই': 'ই.json', 'ঈ': 'ঈ.json',
    'উ': 'উ.json', 'ঊ': 'ঊ.json', 'ঋ': 'ঋ.json', 'এ': 'এ.json',
    'ঐ': 'ঐ.json', 'ও': 'ও.json', 'ঔ': 'ঔ.json',
    'ক': 'ক.json', 'খ': 'খ.json', 'গ': 'গ.json', 'ঘ': 'ঘ.json', 'ঙ': 'ঙ.json',
    'চ': 'চ.json', 'ছ': 'ছ.json', 'জ': 'জ.json', 'ঝ': 'ঝ.json', 'ঞ': 'ঞ.json',
    'ট': 'ট.json', 'ঠ': 'ঠ.json', 'ড': 'ড.json', 'ঢ': 'ঢ.json', 'ণ': 'ণ.json',
    'ত': 'ত.json', 'থ': 'থ.json', 'দ': 'দ.json', 'ধ': 'ধ.json', 'ন': 'ন.json',
    'প': 'প.json', 'ফ': 'ফ.json', 'ব': 'ব.json', 'ভ': 'ভ.json', 'ম': 'ম.json',
    'য': 'য.json', 'র': 'র.json', 'ল': 'ল.json', 'শ': 'শ.json', 'ষ': 'ষ.json',
    'স': 'স.json', 'হ': 'হ.json', 'ড়': 'ড়.json', 'ঢ়': 'ঢ়.json', 'য়': 'য়.json',
    'ৎ': 'ৎ.json', 'ং': 'ং.json', 'ঃ': 'ঃ.json', 'ঁ': 'ঁ.json'
};
/**
 * Get the first character of a Bishnupriya word
 * Handles Bengali script properly
 */
function getFirstCharacter(word) {
    if (!word || word.length === 0)
        return '';
    // Get the first character
    const firstChar = word.charAt(0);
    console.log(`First character of "${word}": "${firstChar}" (Unicode: ${firstChar.charCodeAt(0).toString(16)})`);
    return firstChar;
}
/**
 * Get the alphabet file name for a given character
 */
function getAlphabetFileName(character) {
    const fileName = ALPHABET_MAP[character];
    console.log(`Looking for alphabet file for "${character}": ${fileName || 'NOT FOUND'}`);
    return fileName || null;
}
/**
 * Load words from an alphabet JSON file
 */
function loadAlphabetFile(fileName) {
    try {
        // Try multiple path resolutions to handle both src and dist directories
        const possiblePaths = [
            path.join(__dirname, '../data/alphabets', fileName),
            path.join(__dirname, '../../src/data/alphabets', fileName),
            path.join(process.cwd(), 'src/data/alphabets', fileName),
            path.join(process.cwd(), 'backend/src/data/alphabets', fileName),
        ];
        let filePath = '';
        for (const tryPath of possiblePaths) {
            if (fs.existsSync(tryPath)) {
                filePath = tryPath;
                break;
            }
        }
        if (!filePath) {
            console.warn(`Alphabet file not found: ${fileName}. Tried paths:`, possiblePaths);
            return [];
        }
        console.log(`Attempting to load file: ${filePath}`);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(fileContent);
        // Handle both direct array format and object with 'words' property
        let words = Array.isArray(data) ? data : (data.words || []);
        // Generate ASCII-safe IDs if they don't exist (hex hash)
        words = words.map((word, index) => {
            if (word.id && typeof word.id === 'string')
                return word;
            const seed = `${word.bpy || ''}|${word.bn || ''}|${word.en || ''}|${fileName}|${index}`;
            const hash = crypto.createHash('sha1').update(seed).digest('hex').slice(0, 12);
            return {
                ...word,
                id: hash
            };
        });
        console.log(`Loaded ${words.length} words from ${fileName}`);
        return words;
    }
    catch (error) {
        console.error(`Error loading alphabet file ${fileName}:`, error);
        return [];
    }
}
/**
 * Search for a word in the appropriate alphabet file(s)
 */
function searchWordInAlphabets(searchTerm, language) {
    const results = [];
    const searchLower = searchTerm.toLowerCase();
    console.log(`\n=== Searching for "${searchTerm}" in language "${language}" ===`);
    // For Bishnupriya search, we know which file to check
    if (language === 'bpy') {
        const firstChar = getFirstCharacter(searchTerm);
        const fileName = getAlphabetFileName(firstChar);
        if (fileName) {
            console.log(`Searching in specific file: ${fileName}`);
            const words = loadAlphabetFile(fileName);
            const matches = words.filter(word => {
                const match = word.bpy.toLowerCase().includes(searchLower);
                if (match) {
                    console.log(`Found match: ${word.bpy}`);
                }
                return match;
            });
            results.push(...matches);
        }
        else {
            console.log(`No alphabet file found for character: ${firstChar}`);
        }
    }
    else {
        // For Bengali/English, we need to search all files
        console.log(`Searching all files for ${language} term`);
        const allFiles = Object.values(ALPHABET_MAP);
        for (const fileName of allFiles) {
            const words = loadAlphabetFile(fileName);
            const matches = words.filter(word => word[language].toLowerCase().includes(searchLower));
            if (matches.length > 0) {
                console.log(`Found ${matches.length} matches in ${fileName}`);
            }
            results.push(...matches);
        }
    }
    console.log(`Total results found: ${results.length}\n`);
    return results;
}
/**
 * Get a word by its ID (searches all alphabet files)
 */
function getWordById(id) {
    const allFiles = Object.values(ALPHABET_MAP);
    for (const fileName of allFiles) {
        const words = loadAlphabetFile(fileName);
        const word = words.find(w => w.id === id);
        if (word) {
            return word;
        }
    }
    return null;
}
/**
 * Get all words from all alphabet files
 */
function getAllWords() {
    const allWords = [];
    const allFiles = Object.values(ALPHABET_MAP);
    for (const fileName of allFiles) {
        const words = loadAlphabetFile(fileName);
        allWords.push(...words);
    }
    return allWords;
}
/**
 * Get all available alphabets
 */
function getAllAlphabets() {
    return Object.keys(ALPHABET_MAP);
}
/**
 * Get words by alphabet letter
 */
function getWordsByAlphabet(letter) {
    const fileName = getAlphabetFileName(letter);
    if (!fileName) {
        return [];
    }
    return loadAlphabetFile(fileName);
}
