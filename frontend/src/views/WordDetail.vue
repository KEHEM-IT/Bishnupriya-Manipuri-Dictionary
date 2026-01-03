<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ThemeToggle from '../components/ThemeToggle.vue';
import Footer from '../components/Footer.vue';
import { Word } from '../types';
import axios from 'axios';

const route = useRoute();
const word = ref<Word | null>(null);
const loading = ref(true);

const speak = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        if (lang === 'english') utterance.lang = 'en-US';
        else if (lang === 'bengali') utterance.lang = 'bn-IN';
        else utterance.lang = 'bn-IN';
        utterance.rate = 0.8;
        window.speechSynthesis.speak(utterance);
    }
};

onMounted(async () => {
    try {
        const response = await axios.get(`/api/dictionary/word/${route.params.id}`);
        word.value = response.data;
    } catch (error) {
        console.error('Failed to load word:', error);
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
        <!-- Header -->
        <header
            class="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
            <div class="container mx-auto px-4 py-4">
                <div class="flex justify-between items-center">
                    <router-link to="/" class="flex items-center gap-3">
                        <div
                            class="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-lg flex items-center justify-center">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <div>
                            <h1 class="text-xl font-bold text-gray-900 dark:text-white">বিষ্ণুপ্রিয়া</h1>
                            <p class="text-xs text-gray-600 dark:text-gray-400">Dictionary</p>
                        </div>
                    </router-link>

                    <div class="flex items-center gap-3">
                        <router-link to="/"
                            class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            ← Back
                        </router-link>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </header>

        <div v-if="loading" class="container mx-auto px-4 py-20 text-center">
            <div
                class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 dark:border-blue-400 border-t-transparent">
            </div>
        </div>

        <div v-else-if="!word" class="container mx-auto px-4 py-20 text-center">
            <p class="text-xl text-gray-600 dark:text-gray-400">Word not found</p>
        </div>

        <div v-else class="container mx-auto px-4 py-8 max-w-5xl">
            <!-- Main Word Card -->
            <div
                class="bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-2xl p-8 shadow-2xl text-white mb-8">
                <div class="flex flex-wrap gap-2 mb-4">
                    <span v-if="word.partOfSpeech" class="px-3 py-1 bg-white/20 rounded-full text-sm">
                        {{ word.partOfSpeech }}
                    </span>
                    <span v-if="word.category" class="px-3 py-1 bg-white/20 rounded-full text-sm">
                        {{ word.category }}
                    </span>
                </div>

                <h1 class="text-5xl md:text-6xl font-bold mb-6">{{ word.bishnupriya }}</h1>

                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <p class="text-blue-100 text-sm mb-2">Bengali</p>
                        <p class="text-2xl font-semibold">{{ word.bengali }}</p>
                    </div>
                    <div>
                        <p class="text-purple-100 text-sm mb-2">English</p>
                        <p class="text-2xl font-semibold">{{ word.english }}</p>
                    </div>
                </div>
            </div>

            <!-- Pronunciation Section -->
            <div v-if="word.pronunciation" class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                    Pronunciation
                </h2>
                <div class="grid md:grid-cols-3 gap-6">
                    <div v-if="word.pronunciation.bishnupriya" class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Bishnupriya</p>
                        <div class="flex items-center justify-between">
                            <p class="font-mono text-xl text-gray-900 dark:text-white">{{ word.pronunciation.bishnupriya
                                }}</p>
                            <button @click="speak(word.bishnupriya, 'bishnupriya')"
                                class="p-3 bg-blue-600 dark:bg-blue-500 text-white rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div v-if="word.pronunciation.bengali" class="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Bengali</p>
                        <div class="flex items-center justify-between">
                            <p class="font-mono text-xl text-gray-900 dark:text-white">{{ word.pronunciation.bengali }}
                            </p>
                            <button @click="speak(word.bengali, 'bengali')"
                                class="p-3 bg-green-600 dark:bg-green-500 text-white rounded-full hover:bg-green-700 dark:hover:bg-green-600 transition">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div v-if="word.pronunciation.english" class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl">
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">English</p>
                        <div class="flex items-center justify-between">
                            <p class="font-mono text-xl text-gray-900 dark:text-white">{{ word.pronunciation.english }}
                            </p>
                            <button @click="speak(word.english, 'english')"
                                class="p-3 bg-purple-600 dark:bg-purple-500 text-white rounded-full hover:bg-purple-700 dark:hover:bg-purple-600 transition">
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
                class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    Example Sentences
                </h2>
                <div class="space-y-6">
                    <div v-for="(example, idx) in word.exampleSentences" :key="idx"
                        class="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border-l-4 border-amber-500">
                        <p class="text-xl font-semibold text-gray-900 dark:text-white mb-3">{{ example.bishnupriya }}
                        </p>
                        <p class="text-gray-700 dark:text-gray-300 mb-2">{{ example.bengali }}</p>
                        <p class="text-gray-600 dark:text-gray-400 italic">{{ example.english }}</p>
                    </div>
                </div>
            </div>

            <!-- Grammar Information -->
            <div v-if="word.grammar" class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Grammar
                </h2>

                <div class="grid md:grid-cols-2 gap-6 mb-6">
                    <div v-if="word.grammar.gender" class="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Gender</p>
                        <p class="text-xl font-semibold text-gray-900 dark:text-white capitalize">{{ word.grammar.gender
                            }}</p>
                    </div>
                    <div v-if="word.grammar.plural" class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Plural Form</p>
                        <p class="text-xl font-semibold text-gray-900 dark:text-white">{{ word.grammar.plural }}</p>
                    </div>
                </div>

                <div v-if="word.grammar.conjugations && word.grammar.conjugations.length > 0" class="mb-6">
                    <p class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Conjugations</p>
                    <div class="grid md:grid-cols-3 gap-4">
                        <div v-for="conj in word.grammar.conjugations" :key="conj.tense"
                            class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
                            <p class="text-xs text-gray-600 dark:text-gray-400 uppercase mb-1">{{ conj.tense }}</p>
                            <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ conj.form }}</p>
                        </div>
                    </div>
                </div>

                <div v-if="word.grammar.usage" class="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl mb-4">
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Usage</p>
                    <p class="text-gray-900 dark:text-white">{{ word.grammar.usage }}</p>
                </div>

                <div v-if="word.grammar.notes" class="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl">
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Notes</p>
                    <p class="text-gray-900 dark:text-white">{{ word.grammar.notes }}</p>
                </div>
            </div>

            <!-- Related Words -->
            <div class="grid md:grid-cols-3 gap-6">
                <div v-if="word.synonyms && word.synonyms.length > 0"
                    class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                    <h3 class="text-lg font-bold text-blue-600 dark:text-blue-400 mb-4">Synonyms</h3>
                    <div class="flex flex-wrap gap-2">
                        <span v-for="syn in word.synonyms" :key="syn"
                            class="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-lg text-sm">
                            {{ syn }}
                        </span>
                    </div>
                </div>

                <div v-if="word.antonyms && word.antonyms.length > 0"
                    class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                    <h3 class="text-lg font-bold text-red-600 dark:text-red-400 mb-4">Antonyms</h3>
                    <div class="flex flex-wrap gap-2">
                        <span v-for="ant in word.antonyms" :key="ant"
                            class="px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-lg text-sm">
                            {{ ant }}
                        </span>
                    </div>
                </div>

                <div v-if="word.similarWords && word.similarWords.length > 0"
                    class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                    <h3 class="text-lg font-bold text-purple-600 dark:text-purple-400 mb-4">Similar Words</h3>
                    <div class="flex flex-wrap gap-2">
                        <span v-for="similar in word.similarWords" :key="similar"
                            class="px-3 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-lg text-sm">
                            {{ similar }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <Footer />
    </div>
</template>