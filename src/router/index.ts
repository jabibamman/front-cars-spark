// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'
import AnnoncesVehiclesView from '../components/AnnoncesVehiclesView.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/vehicles', component: AnnoncesVehiclesView },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
