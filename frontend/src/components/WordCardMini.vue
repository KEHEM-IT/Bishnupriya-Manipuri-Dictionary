<script setup lang="ts">
import { Word } from '../types';

defineProps<{
    word: Word;
}>();
</script>

<template>
    <router-link :to="`/word/${word.id}`"
        class="block bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
        <div class="flex justify-between items-start mb-3">
            <div class="flex gap-2 flex-wrap">
                <span v-if="word.category"
                    class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                    {{ word.category }}
                </span>
                <span v-if="word.partOfSpeech"
                    class="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded-full">
                    {{ word.partOfSpeech }}
                </span>
            </div>
        </div>

        <div class="space-y-3 mb-4">
            <div>
                <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Bishnupriya</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ word.bishnupriya }}</p>
            </div>

            <div class="flex gap-4 text-sm">
                <div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Bengali</p>
                    <p class="font-semibold text-gray-800 dark:text-gray-200">{{ word.bengali }}</p>
                </div>
                <div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">English</p>
                    <p class="font-semibold text-gray-800 dark:text-gray-200">{{ word.english }}</p>
                </div>
            </div>
        </div>

        <div v-if="word.exampleSentences && word.exampleSentences.length > 0"
            class="pt-3 border-t border-gray-200 dark:border-gray-700">
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Example:</p>
            <p class="text-sm text-gray-700 dark:text-gray-300 italic line-clamp-2">
                {{ word.exampleSentences[0].english }}
            </p>
        </div>

        <div class="mt-4 flex items-center justify-between">
            <span class="text-sm text-blue-600 dark:text-blue-400 font-medium">View Details →</span>
            <div class="flex gap-2 text-gray-400 dark:text-gray-500">
                <svg v-if="word.pronunciation" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                </svg>
                <svg v-if="word.grammar" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
            </div>
        </div>
    </router-link>
</template>