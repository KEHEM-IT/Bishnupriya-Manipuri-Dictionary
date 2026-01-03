// Location: frontend/src/types/index.ts
export interface Word {
    id: string;
    bishnupriya: string;
    bengali: string;
    english: string;
    category?: string;
    partOfSpeech?: string;
    pronunciation?: {
        bishnupriya?: string;
        bengali?: string;
        english?: string;
    };
    exampleSentences?: ExampleSentence[];
    similarWords?: string[];
    synonyms?: string[];
    antonyms?: string[];
    grammar?: GrammarInfo;
    audioUrl?: string;
}

export interface ExampleSentence {
    bishnupriya: string;
    bengali: string;
    english: string;
}

export interface GrammarInfo {
    gender?: string;
    plural?: string;
    conjugations?: Conjugation[];
    usage?: string;
    notes?: string;
}

export interface Conjugation {
    tense: string;
    form: string;
}

export type Language = 'bishnupriya' | 'bengali' | 'english';

export interface LanguageOption {
    value: Language;
    label: string;
    nativeLabel: string;
}

export type Theme = 'light' | 'dark';