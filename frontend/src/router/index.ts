// frontend/src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import WordDetail from '../views/WordDetail.vue';
import SearchResults from '../views/SearchResults.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/search',
        name: 'SearchResults',
        component: SearchResults
    },
    {
        path: '/word/:id',
        name: 'WordDetail',
        component: WordDetail
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;