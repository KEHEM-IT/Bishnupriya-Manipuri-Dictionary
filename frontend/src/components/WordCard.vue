<!-- Location: frontend/src/components/WordCard.vue -->
<script setup lang="ts">
import { Word } from '../types';

defineProps<{
    word: Word;
}>();

const emit = defineEmits<{
    (e: 'view-details', word: Word): void;
}>();
</script>

<template>
    <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
        @click="emit('view-details', word)">
        <div class="flex justify-between items-start mb-3">
            <div class="flex gap-2">
                <span v-if="word.category" class="px-3 py-1 bg-secondary text-white text-xs rounded-full">
                    {{ word.category }}
                </span>
                <span v-if="word.partOfSpeech" class="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {{ word.partOfSpeech }}
                </span>
            </div>
            <button class="text-gray-400 hover:text-primary transition">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
        </div>

        <div class="space-y-3">
            <div class="border-l-4 border-blue-500 pl-4">
                <p class="text-xs text-gray-500 uppercase tracking-wide">Bishnupriya</p>
                <p class="text-2xl font-semibold text-gray-800">{{ word.bishnupriya }}</p>
                <p v-if="word.pronunciation?.bishnupriya" class="text-sm text-gray-500 font-mono mt-1">
                    /{{ word.pronunciation.bishnupriya }}/
                </p>
            </div>

            <div class="border-l-4 border-green-500 pl-4">
                <p class="text-xs text-gray-500 uppercase tracking-wide">Bengali</p>
                <p class="text-2xl font-semibold text-gray-800">{{ word.bengali }}</p>
            </div>

            <div class="border-l-4 border-purple-500 pl-4">
                <p class="text-xs text-gray-500 uppercase tracking-wide">English</p>
                <p class="text-2xl font-semibold text-gray-800">{{ word.english }}</p>
            </div>
        </div>

        <div v-if="word.exampleSentences && word.exampleSentences.length > 0"
            class="mt-4 pt-4 border-t border-gray-100">
            <p class="text-xs text-gray-500 mb-1">Example:</p>
            <p class="text-sm text-gray-700 italic">{{ word.exampleSentences[0].english }}</p>
        </div>

        <div class="mt-4 flex justify-between items-center text-sm text-gray-500">
            <span>Click for details</span>
            <div class="flex gap-1">
                <svg v-if="word.pronunciation" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                </svg>
                <svg v-if="word.exampleSentences && word.exampleSentences.length > 0" class="w-4 h-4"
                    fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                        clip-rule="evenodd" />
                </svg>
            </div>
        </div>
    </div>
</template>