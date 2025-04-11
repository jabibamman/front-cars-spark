<template>
  <div class="max-w-4xl mx-auto py-12 px-4">
    <h1 class="text-3xl font-bold text-center mb-8">📄 Répartition des statuts de titre</h1>

    <div class="flex justify-center mb-8">
      <apexchart
          type="pie"
          width="500"
          :options="chartOptions"
          :series="chartSeries"
      />
    </div>

    <div class="mt-6 text-sm text-gray-500 text-center">
      Source : données agrégées depuis le dataset Craigslist Vehicles
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import VueApexCharts from 'vue3-apexcharts'

const chartSeries = ref<number[]>([])
const chartLabels = ref<string[]>([])

const chartOptions = ref({
  labels: chartLabels.value,
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 300
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
})

// Données mockées depuis ton CSV (remplace avec un appel API réel si nécessaire)
onMounted(() => {
  const data = [
    { title_status: 'clean', count: 405117 },
    { title_status: 'salvage', count: 3868 },
    { title_status: 'lien', count: 1422 },
    { title_status: 'missing', count: 814 },
    { title_status: 'NaN', count: 21618 }
  ]

  chartSeries.value = data.map(d => d.count)
  chartLabels.value = data.map(d => d.title_status === 'NaN' ? 'inconnu' : d.title_status)
})
</script>