<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useVoiceSearch } from '../composables/useVoiceSearch';
import { Language } from '../types';

const router = useRouter();
const searchTerm = ref('');
const selectedLanguage = ref<Language>('english');

const { isListening, transcript, isSupported, initVoiceRecognition, startListening, stopListening } = useVoiceSearch();

initVoiceRecognition();

watch(transcript, (newValue) => {
    if (newValue) {
        searchTerm.value = newValue;
        handleSearch();
    }
});

const handleSearch = () => {
    if (searchTerm.value.trim()) {
        router.push({
            name: 'SearchResults',
            query: {
                q: searchTerm.value,
                lang: selectedLanguage.value
            }
        });
    }
};

const handleVoiceSearch = () => {
    if (isListening.value) {
        stopListening();
    } else {
        startListening();
    }
};
</script>

<template>
    <div class="w-full max-w-3xl mx-auto">
        <div class="mb-4 flex gap-2 justify-center flex-wrap">
            <button v-for="lang in [
                { value: 'bishnupriya', label: 'বিষ্ণুপ্রিয়া' },
                { value: 'bengali', label: 'বাংলা' },
                { value: 'english', label: 'English' }
            ]" :key="lang.value" @click="selectedLanguage = lang.value as Language" :class="[
            'px-4 py-2 rounded-lg font-medium transition-all text-sm',
            selectedLanguage === lang.value
                ? 'bg-blue-600 text-white dark:bg-blue-500'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
        ]">
                {{ lang.label }}
            </button>
        </div>

        <div class="relative">
            <input v-model="searchTerm" @keyup.enter="handleSearch" type="text"
                :placeholder="`Search in ${selectedLanguage}...`"
                class="w-full px-6 py-4 pr-24 text-lg rounded-2xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors" />

            <div class="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                <button v-if="isSupported" @click="handleVoiceSearch" :class="[
                    'p-2 rounded-lg transition-all',
                    isListening
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                ]" :title="isListening ? 'Stop listening' : 'Voice search'">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                            d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                            clip-rule="evenodd" />
                    </svg>
                </button>

                <button @click="handleSearch"
                    class="p-2 rounded-lg bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                    title="Search">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </div>
        </div>

        <p v-if="isListening" class="text-center mt-3 text-red-500 dark:text-red-400 animate-pulse">
            🎤 Listening...
        </p>
    </div>
</template>