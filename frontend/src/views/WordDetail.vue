<!-- frontend/src/views/WordDetails.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ThemeToggle from '../components/ThemeToggle.vue';
import Footer from '../components/Footer.vue';
import axios from 'axios';

const route = useRoute();
const word = ref<any | null>(null);
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
        // Support two formats:
        // 1) /word/<id>  -> fetch by id
        // 2) /word/<url-encoded-bpy>?lang=bpy -> search by Bishnupriya word and take first result

        const paramId = (route.params.id || route.params.identifier) as string | undefined;
        const queryLang = (route.query.lang as string) || '';

        if (!paramId) {
            word.value = null;
            return;
        }

        // If client passed lang=bpy, treat the path param as the Bishnupriya word
        if (queryLang === 'bpy') {
            const decoded = decodeURIComponent(paramId);
            const resp = await axios.get('/api/dictionary/search', {
                params: { term: decoded, language: 'bpy' }
            });

            if (resp.data && resp.data.success && resp.data.count > 0) {
                word.value = resp.data.data[0];
            } else {
                word.value = null;
            }
        } else {
            // otherwise treat param as id
            const resp = await axios.get(`/api/dictionary/word/${paramId}`);
            if (resp.data && resp.data.success && resp.data.data) {
                word.value = resp.data.data;
            } else {
                word.value = null;
            }
        }
    } catch (error) {
        console.error('Failed to load word:', error);
        word.value = null;
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
                    <span v-if="word.grammar?.partOfSpeech?.length" v-for="pos in word.grammar.partOfSpeech" :key="pos"
                        class="px-3 py-1 bg-white/20 rounded-full text-sm">
                        {{ pos }}
                    </span>
                    <span v-if="word.cat?.length" v-for="category in word.cat" :key="category"
                        class="px-3 py-1 bg-white/20 rounded-full text-sm">
                        {{ category }}
                    </span>
                    <span v-if="word.madoi" class="px-3 py-1 bg-green-500/30 rounded-full text-sm">
                        মাদৈ
                    </span>
                    <span v-if="word.rajar" class="px-3 py-1 bg-purple-500/30 rounded-full text-sm">
                        রাজার
                    </span>
                </div>

                <h1 class="text-5xl md:text-6xl font-bold mb-6">{{ word.bpy }}</h1>

                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <p class="text-blue-100 text-sm mb-2">Bengali</p>
                        <p class="text-2xl font-semibold">{{ word.bn }}</p>
                    </div>
                    <div>
                        <p class="text-purple-100 text-sm mb-2">English</p>
                        <p class="text-2xl font-semibold">{{ word.en }}</p>
                    </div>
                </div>

                <!-- Romanization -->
                <div v-if="word.romanization?.length" class="mt-6 pt-6 border-t border-white/20">
                    <p class="text-blue-100 text-sm mb-2">Romanization</p>
                    <div class="flex flex-wrap gap-2">
                        <span v-for="rom in word.romanization" :key="rom"
                            class="px-3 py-1 bg-white/20 rounded-lg text-lg">
                            {{ rom }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Description -->
            <div v-if="word.description" class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Description
                </h2>
                <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{{ word.description }}</p>
            </div>

            <!-- Meaning -->
            <div v-if="word.meaning?.length" class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Meaning</h2>
                <ul class="space-y-2">
                    <li v-for="(meaning, idx) in word.meaning" :key="idx"
                        class="text-lg text-gray-700 dark:text-gray-300 flex items-start gap-2">
                        <span class="text-blue-600 dark:text-blue-400 font-bold">•</span>
                        <span>{{ meaning }}</span>
                    </li>
                </ul>
            </div>

            <!-- Pronunciation Section -->
            <div v-if="word.phonetic || word.IPA" class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                    Pronunciation
                </h2>

                <!-- IPA -->
                <div v-if="word.IPA" class="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl mb-6">
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">IPA</p>
                    <p class="font-mono text-2xl text-gray-900 dark:text-white">{{ word.IPA }}</p>
                </div>

                <!-- Phonetic -->
                <div v-if="word.phonetic" class="grid md:grid-cols-3 gap-6">
                    <div v-if="word.phonetic.bpy" class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Bishnupriya</p>
                        <div class="flex items-center justify-between">
                            <p class="font-mono text-xl text-gray-900 dark:text-white">{{ word.phonetic.bpy }}</p>
                            <button @click="speak(word.bpy, 'bishnupriya')"
                                class="p-3 bg-blue-600 dark:bg-blue-500 text-white rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div v-if="word.phonetic.bn" class="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Bengali</p>
                        <div class="flex items-center justify-between">
                            <p class="font-mono text-xl text-gray-900 dark:text-white">{{ word.phonetic.bn }}</p>
                            <button @click="speak(word.bn, 'bengali')"
                                class="p-3 bg-green-600 dark:bg-green-500 text-white rounded-full hover:bg-green-700 dark:hover:bg-green-600 transition">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div v-if="word.phonetic.en" class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl">
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">English</p>
                        <div class="flex items-center justify-between">
                            <p class="font-mono text-xl text-gray-900 dark:text-white">{{ word.phonetic.en }}</p>
                            <button @click="speak(word.en, 'english')"
                                class="p-3 bg-purple-600 dark:bg-purple-500 text-white rounded-full hover:bg-purple-700 dark:hover:bg-purple-600 transition">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Similar Pronunciations -->
                <div v-if="word['similar-prons']?.length"
                    class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">Similar Pronunciations</p>
                    <div class="flex flex-wrap gap-2">
                        <span v-for="pron in word['similar-prons']" :key="pron"
                            class="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg">
                            {{ pron }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Example Sentences -->
            <div v-if="word.exampleSentences?.length" class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    Example Sentences
                </h2>
                <div class="space-y-4">
                    <div v-for="(example, idx) in word.exampleSentences" :key="idx"
                        class="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border-l-4 border-amber-500">
                        <p class="text-xl font-semibold text-gray-900 dark:text-white">{{ example }}</p>
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

                <div class="grid md:grid-cols-3 gap-6 mb-6">
                    <div v-if="word.grammar.gender" class="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Gender</p>
                        <p class="text-xl font-semibold text-gray-900 dark:text-white capitalize">{{ word.grammar.gender
                            }}</p>
                    </div>
                    <div v-if="word.grammar.number?.plural" class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Plural Form</p>
                        <p class="text-xl font-semibold text-gray-900 dark:text-white">{{ word.grammar.number.plural }}
                        </p>
                    </div>
                    <div v-if="word.grammar.sandhi" class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl">
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Sandhi</p>
                        <p class="text-xl font-semibold text-gray-900 dark:text-white">{{ word.grammar.sandhi }}</p>
                    </div>
                </div>
            </div>

            <!-- Origin -->
            <div v-if="word.origin || word.sankrit" class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Origin
                </h2>
                <div v-if="word.sankrit" class="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-xl mb-4">
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Sanskrit</p>
                    <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ word.sankrit }}</p>
                </div>
                <div v-if="word.origin">
                    <div v-for="(value, key) in word.origin" :key="key" class="mb-4">
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">{{ key }}</p>
                        <p class="text-lg text-gray-900 dark:text-white">
                            {{ Array.isArray(value) ? value.join(', ') : value }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Usage -->
            <div v-if="word.usage" class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Usage Information</h2>
                <div class="grid md:grid-cols-3 gap-6">
                    <div v-if="word.usage.commonness" class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Commonness</p>
                        <p class="text-xl font-semibold text-gray-900 dark:text-white capitalize">{{
                            word.usage.commonness }}</p>
                    </div>
                    <div v-if="word.usage.usageMean" class="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Usage Mean</p>
                        <p class="text-xl font-semibold text-gray-900 dark:text-white capitalize">{{
                            word.usage.usageMean }}</p>
                    </div>
                    <div v-if="word.usage.region?.length" class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl">
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Regions</p>
                        <div class="flex flex-wrap gap-2">
                            <span v-for="region in word.usage.region" :key="region"
                                class="px-2 py-1 bg-purple-200 dark:bg-purple-700 text-purple-900 dark:text-purple-100 rounded text-sm">
                                {{ region }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Related Words -->
            <div class="grid md:grid-cols-3 gap-6 mb-8">
                <div v-if="word.synonyms?.length" class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                    <h3 class="text-lg font-bold text-blue-600 dark:text-blue-400 mb-4">Synonyms</h3>
                    <div class="flex flex-wrap gap-2">
                        <span v-for="syn in word.synonyms" :key="syn"
                            class="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-lg text-sm">
                            {{ syn }}
                        </span>
                    </div>
                </div>

                <div v-if="word.antonyms?.length" class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                    <h3 class="text-lg font-bold text-red-600 dark:text-red-400 mb-4">Antonyms</h3>
                    <div class="flex flex-wrap gap-2">
                        <span v-for="ant in word.antonyms" :key="ant"
                            class="px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-lg text-sm">
                            {{ ant }}
                        </span>
                    </div>
                </div>

                <div v-if="word.similarBn?.length" class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                    <h3 class="text-lg font-bold text-green-600 dark:text-green-400 mb-4">Similar (Bengali)</h3>
                    <div class="flex flex-wrap gap-2">
                        <span v-for="similar in word.similarBn" :key="similar"
                            class="px-3 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-lg text-sm">
                            {{ similar }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6 mb-8">
                <div v-if="word.similarEn?.length" class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                    <h3 class="text-lg font-bold text-purple-600 dark:text-purple-400 mb-4">Similar (English)</h3>
                    <div class="flex flex-wrap gap-2">
                        <span v-for="similar in word.similarEn" :key="similar"
                            class="px-3 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-lg text-sm">
                            {{ similar }}
                        </span>
                    </div>
                </div>

                <div v-if="word.similarSangkrit?.length" class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                    <h3 class="text-lg font-bold text-orange-600 dark:text-orange-400 mb-4">Similar (Sanskrit)</h3>
                    <div class="space-y-2">
                        <div v-for="(similar, idx) in word.similarSangkrit" :key="idx"
                            class="px-3 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded-lg text-sm">
                            {{ similar[0] }} <span class="text-xs opacity-70">({{ similar[1] }})</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bishnupriya Differences -->
            <div v-if="word.bpyDifferences" class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Regional Differences</h2>
                <div class="space-y-4">
                    <div v-for="(value, key) in word.bpyDifferences" :key="key"
                        class="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl">
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Variant {{ key }}</p>
                        <div class="flex flex-wrap gap-2">
                            <span v-for="variant in value" :key="variant"
                                class="px-3 py-2 bg-indigo-200 dark:bg-indigo-700 text-indigo-900 dark:text-indigo-100 rounded-lg">
                                {{ variant }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- References -->
            <div v-if="word.references?.length" class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">References</h3>
                <ul class="space-y-2">
                    <li v-for="ref in word.references" :key="ref">
                        <a :href="ref" target="_blank" rel="noopener noreferrer"
                            class="text-blue-600 dark:text-blue-400 hover:underline break-all">
                            {{ ref }}
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <Footer />
    </div>
</template>