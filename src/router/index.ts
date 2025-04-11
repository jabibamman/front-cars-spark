// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'
import AnnoncesVehiclesView from '../components/AnnoncesVehiclesView.vue'
import TitleStatsView from "../components/TitleStatsView.vue";

const routes = [
    { path: '/', component: HomeView },
    { path: '/vehicles', component: AnnoncesVehiclesView },
    { path: '/title-status', component: TitleStatsView }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
