// Location: backend/src/data/words.ts
import { Word } from '../types';

export const words: Word[] = [
    {
        id: '1',
        bishnupriya: 'ইমা',
        bengali: 'মা',
        english: 'Mother',
        category: 'family',
        partOfSpeech: 'noun',
        pronunciation: {
            bishnupriya: 'i-ma',
            bengali: 'ma',
            english: 'muh-ther'
        },
        exampleSentences: [
            {
                bishnupriya: 'মরার ইমা অকসে উপা',
                bengali: 'আমার মা খুব ভালো',
                english: 'My mother is very good'
            }
        ],
        similarWords: ['বাবা', 'আপা', 'দাদা'],
        synonyms: ['মাতা', 'জননী'],
        grammar: {
            gender: 'feminine',
            usage: 'Common term for mother in Bishnupriya Manipuri',
            notes: 'Respectful term, used in all contexts'
        }
    },
    {
        id: '2',
        bishnupriya: 'বাবা',
        bengali: 'বাবা',
        english: 'Father',
        category: 'family',
        partOfSpeech: 'noun',
        pronunciation: {
            bishnupriya: 'ba-ba',
            bengali: 'ba-ba',
            english: 'fah-ther'
        },
        exampleSentences: [
            {
                bishnupriya: 'মরার বাবা কামত গইলই',
                bengali: 'আমার বাবা কাজে গেছে',
                english: 'My father has gone to work'
            }
        ],
        similarWords: ['ইমা', 'দাদা', 'নানা'],
        synonyms: ['পিতা'],
        grammar: {
            gender: 'masculine',
            usage: 'Common term for father',
            notes: 'Used with respect in family context'
        }
    },
    {
        id: '3',
        bishnupriya: 'পানি',
        bengali: 'পানি',
        english: 'Water',
        category: 'nature',
        partOfSpeech: 'noun',
        pronunciation: {
            bishnupriya: 'pa-ni',
            bengali: 'pa-ni',
            english: 'wah-ter'
        },
        exampleSentences: [
            {
                bishnupriya: 'পানি দে মরাক',
                bengali: 'আমাকে পানি দাও',
                english: 'Give me water'
            },
            {
                bishnupriya: 'পানি শীতল অসে',
                bengali: 'পানি ঠান্ডা আছে',
                english: 'The water is cold'
            }
        ],
        similarWords: ['জল', 'নদী', 'সাগর'],
        synonyms: ['জল', 'নীর'],
        grammar: {
            usage: 'Essential noun, used in daily conversation',
            notes: 'Can be used for any form of water'
        }
    },
    {
        id: '4',
        bishnupriya: 'ফুল',
        bengali: 'ফুল',
        english: 'Flower',
        category: 'nature',
        partOfSpeech: 'noun',
        pronunciation: {
            bishnupriya: 'phul',
            bengali: 'phul',
            english: 'flou-er'
        },
        exampleSentences: [
            {
                bishnupriya: 'ফুলগুলান সুন্দর অসে',
                bengali: 'ফুলগুলো সুন্দর',
                english: 'The flowers are beautiful'
            }
        ],
        similarWords: ['পাতা', 'গাছ', 'বাগান'],
        synonyms: ['কুসুম', 'পুষ্প'],
        grammar: {
            plural: 'ফুলগুলান',
            usage: 'Common in nature and decoration contexts'
        }
    },
    {
        id: '5',
        bishnupriya: 'কিতাব',
        bengali: 'বই',
        english: 'Book',
        category: 'education',
        partOfSpeech: 'noun',
        pronunciation: {
            bishnupriya: 'ki-tab',
            bengali: 'boi',
            english: 'book'
        },
        exampleSentences: [
            {
                bishnupriya: 'মুই কিতাব পড়িসু',
                bengali: 'আমি বই পড়ছি',
                english: 'I am reading a book'
            },
            {
                bishnupriya: 'এরে কিতাবখান মরার',
                bengali: 'এই বইটা আমার',
                english: 'This book is mine'
            }
        ],
        similarWords: ['খাতা', 'কলম', 'স্কুল'],
        synonyms: ['গ্রন্থ', 'পুস্তক'],
        grammar: {
            plural: 'কিতাবগুলান',
            usage: 'Used in educational contexts'
        }
    },
    {
        id: '6',
        bishnupriya: 'পড়ানি',
        bengali: 'পড়া',
        english: 'Read / Study',
        category: 'education',
        partOfSpeech: 'verb',
        pronunciation: {
            bishnupriya: 'po-ra-ni',
            bengali: 'po-ra',
            english: 'reed / stuh-dee'
        },
        exampleSentences: [
            {
                bishnupriya: 'মুই রজাদিন পড়ি',
                bengali: 'আমি প্রতিদিন পড়ি',
                english: 'I study every day'
            }
        ],
        similarWords: ['লেখানি', 'শিখানি', 'জানানি'],
        synonyms: ['অধ্যয়ন', 'শিক্ষা'],
        grammar: {
            conjugations: [
                { tense: 'present', form: 'পড়ি' },
                { tense: 'past', form: 'পড়িলু' },
                { tense: 'future', form: 'পড়িবু' }
            ],
            usage: 'Common verb for reading and studying'
        }
    },
    {
        id: '7',
        bishnupriya: 'খানি',
        bengali: 'খাওয়া',
        english: 'Eat',
        category: 'actions',
        partOfSpeech: 'verb',
        pronunciation: {
            bishnupriya: 'kha-ni',
            bengali: 'kha-wa',
            english: 'eet'
        },
        exampleSentences: [
            {
                bishnupriya: 'মুই ভাত খাইসু',
                bengali: 'আমি ভাত খাচ্ছি',
                english: 'I am eating rice'
            },
            {
                bishnupriya: 'তুমি কি খাইলা?',
                bengali: 'তুমি কি খেয়েছ?',
                english: 'Did you eat?'
            }
        ],
        similarWords: ['পানি', 'ভাত', 'রান্ধানি'],
        synonyms: ['ভোজন', 'আহার'],
        grammar: {
            conjugations: [
                { tense: 'present', form: 'খাই' },
                { tense: 'past', form: 'খাইলু' },
                { tense: 'future', form: 'খাইবু' }
            ],
            usage: 'Essential verb for eating'
        }
    },
    {
        id: '8',
        bishnupriya: 'উপা',
        bengali: 'ভালো',
        english: 'Good',
        category: 'adjectives',
        partOfSpeech: 'adjective',
        pronunciation: {
            bishnupriya: 'u-pa',
            bengali: 'bha-lo',
            english: 'good'
        },
        exampleSentences: [
            {
                bishnupriya: 'এরে ফলা উপা',
                bengali: 'এই ফলটা ভালো',
                english: 'This fruit is good'
            }
        ],
        similarWords: ['মন্দ', 'সুন্দর', 'বড়'],
        synonyms: ['সুন্দর', 'শোভন'],
        antonyms: ['মন্দ', 'খারাপ'],
        grammar: {
            usage: 'Common adjective for describing quality',
            notes: 'Can be used for people, things, and situations'
        }
    },
    {
        id: '9',
        bishnupriya: 'ঘর',
        bengali: 'ঘর',
        english: 'House',
        category: 'places',
        partOfSpeech: 'noun',
        pronunciation: {
            bishnupriya: 'ghor',
            bengali: 'ghor',
            english: 'house'
        },
        exampleSentences: [
            {
                bishnupriya: 'মরার ঘর বড় অসে',
                bengali: 'আমার ঘর বড়',
                english: 'My house is big'
            }
        ],
        similarWords: ['গাঁও', 'শহর', 'রাম'],
        synonyms: ['বাড়ি', 'গৃহ'],
        grammar: {
            plural: 'ঘরগুলান',
            usage: 'Common noun for house/home'
        }
    },
    {
        id: '10',
        bishnupriya: 'প্রেম',
        bengali: 'ভালোবাসা',
        english: 'Love',
        category: 'emotions',
        partOfSpeech: 'noun',
        pronunciation: {
            bishnupriya: 'prem',
            bengali: 'bha-lo-ba-sa',
            english: 'luhv'
        },
        exampleSentences: [
            {
                bishnupriya: 'প্রেমএগ অকসে শক্তিশালী',
                bengali: 'ভালোবাসা খুব শক্তিশালী',
                english: 'Love is very powerful'
            }
        ],
        similarWords: ['মায়া', 'স্নেহ', 'আদর'],
        synonyms: ['মায়া', 'ভালবাসা', 'স্নেহ'],
        antonyms: ['ঘৃণা', 'দ্বেষ'],
        grammar: {
            usage: 'Emotional and abstract noun',
            notes: 'Used in poetic and everyday contexts'
        }
    }
];