<!-- frontend/src/views/Home.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import SearchBox from '../components/SearchBox.vue';
import WordCardMini from '../components/WordCardMini.vue';
import ThemeToggle from '../components/ThemeToggle.vue';
import Footer from '../components/Footer.vue';
import { Word } from '../types';
import axios from 'axios';

const featuredWords = ref<Word[]>([]);
const loading = ref(true);

onMounted(async () => {
    try {
        const response = await axios.get('/api/dictionary/words');
        // Handle new API response format
        if (response.data.success) {
            featuredWords.value = response.data.data.slice(0, 6);
        } else {
            featuredWords.value = response.data.slice(0, 6);
        }
    } catch (error) {
        console.error('Failed to load words:', error);
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
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
                    <ThemeToggle />
                </div>
            </div>
        </header>

        <!-- Hero Section -->
        <section class="py-20 px-4">
            <div class="container mx-auto text-center">
                <div class="mb-8">
                    <h2
                        class="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                        বিষ্ণুপ্রিয়া মণিপুরী অভিধান
                    </h2>
                    <p class="text-xl text-gray-600 dark:text-gray-400 mb-2">
                        Bishnupriya Manipuri Dictionary
                    </p>
                    <p class="text-sm text-gray-500 dark:text-gray-500">
                        Trilingual • Grammar • Pronunciation • Voice Search
                    </p>
                </div>

                <SearchBox />

                <div class="mt-12 flex gap-4 justify-center flex-wrap text-sm text-gray-600 dark:text-gray-400">
                    <div class="flex items-center gap-2">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path fill-rule="evenodd"
                                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                clip-rule="evenodd" />
                        </svg>
                        <span>Comprehensive Dictionary</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                                clip-rule="evenodd" />
                        </svg>
                        <span>Voice Search</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                        </svg>
                        <span>Audio Pronunciation</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Featured Words Section -->
        <section class="py-12 px-4 bg-white dark:bg-gray-800">
            <div class="container mx-auto">
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                    📚 Today's Featured Words
                </h3>

                <div v-if="loading" class="text-center py-12">
                    <div
                        class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 dark:border-blue-400 border-t-transparent">
                    </div>
                </div>

                <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <WordCardMini v-for="word in featuredWords" :key="word.id" :word="word" />
                </div>
            </div>
        </section>

        <Footer />
    </div>
</template>