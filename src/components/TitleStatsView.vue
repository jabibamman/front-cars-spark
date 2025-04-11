<template>
  <div class="max-w-6xl mx-auto py-12 px-4">
    <h1 class="text-3xl font-bold text-center mb-8">
      📄 Répartition des statuts de titre
    </h1>

    <div class="grid md:grid-cols-2 gap-12">
      <router-link to="/">
      <button class="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow">
        Retour à l'accueil
      </button>
    </router-link>
      <div class="flex justify-center items-center">
        <apexchart
          type="pie"
          width="100%"
          :options="chartOptions"
          :series="chartSeries"
        />
      </div>

      <div class="flex justify-center items-center w-full">
        <div class="w-full max-w-md">
          <table
            class="w-full table-auto border-collapse border border-gray-200 shadow-md rounded-md overflow-hidden"
          >
            <thead class="bg-gray-100">
              <tr>
                <th
                  class="px-4 py-2 text-left font-semibold border-b cursor-pointer"
                  @click="toggleSort('title_status')"
                >
                  Statut
                  <span v-if="sortKey === 'title_status'">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                </th>
                <th
                  class="px-4 py-2 text-right font-semibold border-b cursor-pointer"
                  @click="toggleSort('count')"
                >
                  Nombre
                  <span v-if="sortKey === 'count'">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in sortedData"
                :key="item.title_status"
                class="hover:bg-gray-50"
              >
                <td class="px-4 py-2 capitalize">
                  {{ formatLabel(item.title_status) }}
                </td>
                <td class="px-4 py-2 text-right">
                  {{ item.count.toLocaleString() }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <p class="mt-6 text-sm text-gray-500 text-center">
      Source : données agrégées depuis le dataset Craigslist Vehicles
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import Papa from 'papaparse'
import ApexCharts from 'vue3-apexcharts'

const rawData = ref<{ title_status: string; count: number }[]>([])
const chartLabels = ref<string[]>([])
const chartSeries = ref<number[]>([])


const sortKey = ref<'title_status' | 'count'>('count')
const sortDirection = ref<'asc' | 'desc'>('desc')


function toggleSort(key: 'title_status' | 'count') {
  if (sortKey.value === key) {
    
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    
    sortKey.value = key
    
    sortDirection.value = key === 'title_status' ? 'asc' : 'desc'
  }
}


const sortedData = computed(() => {
  
  const dataCopy = [...rawData.value]
  dataCopy.sort((a, b) => {
    const mod = sortDirection.value === 'asc' ? 1 : -1
    if (sortKey.value === 'count') {
      
      return (a.count - b.count) * mod
    } else {
      
      return a.title_status.toLowerCase().localeCompare(b.title_status.toLowerCase()) * mod
    }
  })
  return dataCopy
})


const chartOptions = computed(() => ({
  labels: chartLabels.value,
  legend: { position: 'bottom' },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: { width: 300 },
      },
    },
  ],
}))


onMounted(() => {
  fetch('/titlestatus.csv')
    .then((res) => res.text())
    .then((csvText) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results: { data: { title_status: string; count: string; }[]; }) => {
          const parsed = results.data as { title_status: string; count: string }[]
          rawData.value = parsed.map((row) => ({
            title_status: row.title_status,
            count: parseInt(row.count),
          }))
          chartLabels.value = rawData.value.map((d) => formatLabel(d.title_status))
          chartSeries.value = rawData.value.map((d) => d.count)
        },
      })
    })
})


function formatLabel(status: string) {
  if (!status || status.toLowerCase() === 'nan') return 'inconnu'
  return status.toLowerCase()
}
</script>
