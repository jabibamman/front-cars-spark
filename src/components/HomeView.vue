<template>
    <div class="h-screen flex flex-col">
        <header class="py-6 shadow-none flex justify-center items-center bg-transparent">
            <img
          src="/logo-text.png"
          alt="logo"
          class="h-20 md:h-28 object-contain"
        />
      </header>
  

      <main class="flex-1 container mx-auto px-4 md:px-0 flex flex-col justify-center items-center">
        <img
            src="/background.png"
            alt="background"
            class="absolute inset-0 w-full h-full object-cover opacity-10 blur-sm pointer-events-none"
        />



        <section class="text-center">
          <h2 class="text-3xl font-semibold mb-4">Explorez facilement vos données véhicules</h2>
          <p class="text-lg text-gray-600 mb-8">
            Une application moderne pour visualiser, filtrer et analyser des annonces de véhicules avec Apache Spark et Scala.
          </p>
          <router-link to="/vehicles">
            <button
              class="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg transition duration-200"
            >
              Découvrir les véhicules
            </button>
          </router-link>
          <router-link to="/title-status">
            <button
              class="ml-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg transition duration-200"
            >
                Explorer le statuts
            </button>
          </router-link>  
          <router-link to="/map">
            <button
              class="ml-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg transition duration-200"
            >
                Explorer les voitures sur la carte
            </button>
          </router-link> 
        </section>
  
        <section class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="p-6 border rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <h3 class="text-xl font-semibold mb-2">🚀 Rapide</h3>
            <p class="text-gray-600">Traitement efficace avec Apache Spark.</p>
          </div>
          <div class="p-6 border rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <h3 class="text-xl font-semibold mb-2">✨ Moderne</h3>
            <p class="text-gray-600">Interface élégante avec Vue 3 et Windi CSS.</p>
          </div>
          <div class="p-6 border rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <h3 class="text-xl font-semibold mb-2">📊 Interactif</h3>
            <p class="text-gray-600">Filtres et graphiques interactifs avec ApexCharts.</p>
          </div>
        </section>
      </main>
      <Footer />

    </div>
  </template>
  
  <script setup lang="ts">
import Footer from './Footer.vue'
  import { RouterLink } from 'vue-router'
  </script>
  