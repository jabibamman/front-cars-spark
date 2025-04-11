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

    <div class="mb-4 flex justify-between items-center">
      <button
        @click="prevPage"
        class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        :disabled="currentPage === 1"
      >
        Précédent
      </button>
      <span>Page {{ currentPage }}</span>
      <button @click="nextPage" class="px-4 py-2 bg-gray-200 rounded">
        Suivant
      </button>
    </div>

    <div class="overflow-auto rounded-lg shadow-lg border">
      <table class="w-full table-auto">
        <thead class="bg-gray-100">
      <tr>
        <th class="px-4 py-2">Photo</th>
        <th class="px-4 py-2">Modèle</th>
        <th class="px-4 py-2">Année</th>
        <th class="px-4 py-2">Prix ($)</th>
        <th class="px-4 py-2">Région</th>
        <th class="px-4 py-2">KM</th>
        <th class="px-4 py-2">Énergie</th>
        <th class="px-4 py-2">Détail</th>
        <th class="px-4 py-2">Lien</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="vehicle in filteredVehicles"
        :key="vehicle.id"
        class="hover:bg-gray-50 transition duration-200"
      >
        <td class="px-4 py-2">
          <img
            :src="vehicle.image_url"
            alt="photo véhicule"
            class="w-20 h-16 object-cover rounded"
            v-if="vehicle.image_url"
          />
        </td>
        <td class="px-4 py-2 font-semibold">{{ vehicle.model || 'Non précisé' }}</td>
        <td class="px-4 py-2">{{ vehicle.year || 'N/A' }}</td>
        <td class="px-4 py-2">{{ vehicle.price || 'N/A' }}</td>
        <td class="px-4 py-2">{{ vehicle.region }}</td>
        <td class="px-4 py-2">{{ vehicle.odometer || 'N/A' }}</td>
        <td class="px-4 py-2">{{ vehicle.fuel || 'N/A' }}</td>
        <td class="px-4 py-2">
          {{ vehicle.description?.slice(0, 50) || '...' }}{{ vehicle.description?.length > 50 ? '…' : '' }}
        </td>
        <td class="px-4 py-2">
          <a
            :href="vehicle.url"
            class="text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >Voir</a>
        </td>
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
import { ref, computed, watch, onMounted } from 'vue'
import axios from 'axios'

const search = ref('')
const vehicles = ref<any[]>([])
const currentPage = ref(1)
const limit = ref(50)

async function fetchVehicles() {
  try {
    const res = await axios.get(
      `http://localhost:3000/api/vehicles?page=${currentPage.value}&limit=${limit.value}`
    )
    vehicles.value = res.data.vehicles || []
  } catch (error) {
    console.error('Erreur de récupération des véhicules:', error)
  }
}

onMounted(() => {
  fetchVehicles()
})

watch([currentPage, limit], fetchVehicles)

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
    data: filteredVehicles.value.map((v) => Number(v.price) || 0),
  },
])

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function nextPage() {
  currentPage.value++
}
</script>
