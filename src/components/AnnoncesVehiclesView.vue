<template>
  <div class="max-w-6xl mx-auto py-8">
    <h1 class="text-3xl font-bold mb-4 text-center">🚗 Annonces Véhicules</h1>

     <router-link to="/">
      <button class="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow">
        Retour à l'accueil
      </button>
    </router-link>
    <input
      v-model="search"
      placeholder="🔍 Rechercher par région, modèle..."
      class="w-full px-4 py-2 rounded-lg border shadow mb-4"
    />

    <div class="overflow-auto rounded-lg shadow-lg border">
      <table class="w-full table-auto">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-2">Modèle</th>
            <th class="px-4 py-2">Région</th>
            <th class="px-4 py-2">Prix ($)</th>
            <th class="px-4 py-2">Année</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="vehicle in filteredVehicles"
            :key="vehicle.id"
            class="hover:bg-gray-50 transition duration-200"
          >
            <td class="px-4 py-2">{{ vehicle.model || 'Non précisé' }}</td>
            <td class="px-4 py-2">{{ vehicle.region }}</td>
            <td class="px-4 py-2">{{ vehicle.price || 'N/A' }}</td>
            <td class="px-4 py-2">{{ vehicle.year || 'N/A' }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-8">
      <apexchart
        type="bar"
        height="350"
        :options="chartOptions"
        :series="series"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
//import VueApexCharts from 'vue3-apexcharts'

const search = ref('')
const vehicles = ref<any[]>([])

onMounted(async () => {
  const res = await axios.get('http://localhost:8080/vehicles')
  vehicles.value = res.data
})

const filteredVehicles = computed(() =>
  vehicles.value.filter(
    (v) =>
      v.region?.toLowerCase().includes(search.value.toLowerCase()) ||
      v.model?.toLowerCase().includes(search.value.toLowerCase())
  )
)

const chartOptions = computed(() => ({
  chart: { id: 'prix-region' },
  xaxis: {
    categories: filteredVehicles.value.map((v) => v.region),
  },
}))

const series = computed(() => [
  {
    name: 'Prix ($)',
    data: filteredVehicles.value.map((v) => v.price || 0),
  },
])
</script>
