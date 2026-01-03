<script setup lang="ts">
import { ref } from 'vue';
import { Word } from '../types';

const props = defineProps<{
    word: Word;
}>();

const emit = defineEmits<{
    (e: 'close'): void;
}>();

const currentLanguage = ref<'bishnupriya' | 'bengali' | 'english'>('bishnupriya');

const speak = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);

        if (lang === 'english') {
            utterance.lang = 'en-US';
        } else if (lang === 'bengali') {
            utterance.lang = 'bn-IN';
        } else {
            utterance.lang = 'bn-IN';
        }

        utterance.rate = 0.8;
        window.speechSynthesis.speak(utterance);
    }
};
</script>

<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" @click="emit('close')">
        <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" @click.stop>
            <div class="sticky top-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-t-2xl">
                <div class="flex justify-between items-start">
                    <div>
                        <h2 class="text-3xl font-bold mb-2">{{ word.bishnupriya }}</h2>
                        <p class="text-blue-100">{{ word.bengali }} • {{ word.english }}</p>
                    </div>
                    <button @click="emit('close')"
                        class="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div class="flex gap-2 mt-4">
                    <span v-if="word.partOfSpeech" class="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                        {{ word.partOfSpeech }}
                    </span>
                    <span v-if="word.category" class="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                        {{ word.category }}
                    </span>
                </div>
            </div>

            <div class="p-6 space-y-6">
                <!-- Pronunciation Section -->
                <div v-if="word.pronunciation" class="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
                    <h3 class="text-xl font-semibold mb-4 flex items-center gap-2">
                        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                        Pronunciation
                    </h3>
                    <div class="grid md:grid-cols-3 gap-4">
                        <div v-if="word.pronunciation.bishnupriya" class="bg-white p-4 rounded-lg">
                            <p class="text-sm text-gray-600 mb-1">Bishnupriya</p>
                            <div class="flex items-center justify-between">
                                <p class="font-mono text-lg">{{ word.pronunciation.bishnupriya }}</p>
                                <button @click="speak(word.bishnupriya, 'bishnupriya')"
                                    class="text-blue-600 hover:text-blue-700">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div v-if="word.pronunciation.bengali" class="bg-white p-4 rounded-lg">
                            <p class="text-sm text-gray-600 mb-1">Bengali</p>
                            <div class="flex items-center justify-between">
                                <p class="font-mono text-lg">{{ word.pronunciation.bengali }}</p>
                                <button @click="speak(word.bengali, 'bengali')"
                                    class="text-green-600 hover:text-green-700">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div v-if="word.pronunciation.english" class="bg-white p-4 rounded-lg">
                            <p class="text-sm text-gray-600 mb-1">English</p>
                            <div class="flex items-center justify-between">
                                <p class="font-mono text-lg">{{ word.pronunciation.english }}</p>
                                <button @click="speak(word.english, 'english')"
                                    class="text-purple-600 hover:text-purple-700">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Example Sentences -->
                <div v-if="word.exampleSentences && word.exampleSentences.length > 0"
                    class="bg-amber-50 p-6 rounded-xl">
                    <h3 class="text-xl font-semibold mb-4 flex items-center gap-2">
                        <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                        Example Sentences
                    </h3>
                    <div class="space-y-4">
                        <div v-for="(example, idx) in word.exampleSentences" :key="idx"
                            class="bg-white p-4 rounded-lg border-l-4 border-amber-500">
                            <p class="text-lg font-medium text-gray-800 mb-2">{{ example.bishnupriya }}</p>
                            <p class="text-gray-600 mb-1">{{ example.bengali }}</p>
                            <p class="text-gray-500 italic">{{ example.english }}</p>
                        </div>
                    </div>
                </div>

                <!-- Grammar Information -->
                <div v-if="word.grammar" class="bg-green-50 p-6 rounded-xl">
                    <h3 class="text-xl font-semibold mb-4 flex items-center gap-2">
                        <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Grammar
                    </h3>
                    <div class="grid md:grid-cols-2 gap-4">
                        <div v-if="word.grammar.gender" class="bg-white p-4 rounded-lg">
                            <p class="text-sm text-gray-600">Gender</p>
                            <p class="font-semibold text-gray-800">{{ word.grammar.gender }}</p>
                        </div>
                        <div v-if="word.grammar.plural" class="bg-white p-4 rounded-lg">
                            <p class="text-sm text-gray-600">Plural Form</p>
                            <p class="font-semibold text-gray-800">{{ word.grammar.plural }}</p>
                        </div>
                    </div>

                    <div v-if="word.grammar.conjugations && word.grammar.conjugations.length > 0" class="mt-4">
                        <p class="text-sm font-semibold text-gray-700 mb-2">Conjugations</p>
                        <div class="grid md:grid-cols-3 gap-3">
                            <div v-for="conj in word.grammar.conjugations" :key="conj.tense"
                                class="bg-white p-3 rounded-lg">
                                <p class="text-xs text-gray-600 uppercase">{{ conj.tense }}</p>
                                <p class="font-semibold text-gray-800">{{ conj.form }}</p>
                            </div>
                        </div>
                    </div>

                    <div v-if="word.grammar.usage" class="mt-4 bg-white p-4 rounded-lg">
                        <p class="text-sm text-gray-600 mb-1">Usage</p>
                        <p class="text-gray-800">{{ word.grammar.usage }}</p>
                    </div>

                    <div v-if="word.grammar.notes" class="mt-4 bg-white p-4 rounded-lg">
                        <p class="text-sm text-gray-600 mb-1">Notes</p>
                        <p class="text-gray-800">{{ word.grammar.notes }}</p>
                    </div>
                </div>

                <!-- Similar Words & Synonyms -->
                <div class="grid md:grid-cols-2 gap-6">
                    <div v-if="word.synonyms && word.synonyms.length > 0" class="bg-blue-50 p-6 rounded-xl">
                        <h3 class="text-lg font-semibold mb-3 text-blue-800">Synonyms</h3>
                        <div class="flex flex-wrap gap-2">
                            <span v-for="syn in word.synonyms" :key="syn"
                                class="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm">
                                {{ syn }}
                            </span>
                        </div>
                    </div>

                    <div v-if="word.antonyms && word.antonyms.length > 0" class="bg-red-50 p-6 rounded-xl">
                        <h3 class="text-lg font-semibold mb-3 text-red-800">Antonyms</h3>
                        <div class="flex flex-wrap gap-2">
                            <span v-for="ant in word.antonyms" :key="ant"
                                class="px-3 py-1 bg-red-200 text-red-800 rounded-full text-sm">
                                {{ ant }}
                            </span>
                        </div>
                    </div>
                </div>

                <div v-if="word.similarWords && word.similarWords.length > 0" class="bg-purple-50 p-6 rounded-xl">
                    <h3 class="text-lg font-semibold mb-3 text-purple-800">Similar Words</h3>
                    <div class="flex flex-wrap gap-2">
                        <span v-for="similar in word.similarWords" :key="similar"
                            class="px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-sm">
                            {{ similar }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>