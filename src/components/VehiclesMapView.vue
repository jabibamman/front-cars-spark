<template>
    <div class="relative w-screen h-screen">
      
      <header
        class="absolute top-0 left-0 z-10 w-full p-4 bg-white/70 backdrop-blur-md flex justify-between items-center"
      >
        
        <button
          class="px-3 py-1 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600 transition duration-200"
          @click="goBack"
        >
          Retour
        </button>
  
        
        <h1 class="text-2xl font-bold text-gray-700">📍 Vehicles Map</h1>
      </header>
  
      
      <div id="map" class="h-full w-full"></div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import L from 'leaflet'
import { useRouter } from 'vue-router';

  const vehicles = ref<{ lat: number; long: number; model: string; price: number }[]>([])
  const router = useRouter()

  function goBack() {
  router.push('/')
  router.back()
}

  onMounted(async () => {
    vehicles.value = [
      { lat: 34.0522, long: -118.2437, model: 'Toyota Camry', price: 4500 },
      { lat: 36.7783, long: -119.4179, model: 'Ford F150', price: 7200 },
      { lat: 40.7128, long: -74.0060, model: 'Honda Civic', price: 5200 },
    ]
  
    // 1) OPTION B: Charger depuis un CSV dans /public/mapdata.csv (exemple)
    /*
    const res = await fetch('/mapdata.csv')
    const csvText = await res.text()
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data as { lat: string; long: string; model: string; price: string }[]
        vehicles.value = data.map((v) => ({
          lat: parseFloat(v.lat),
          long: parseFloat(v.long),
          model: v.model,
          price: parseFloat(v.price)
        }))
        initLeafletMap()
      }
    })
    */
    
    // 2) Initialise la carte
    initLeafletMap()
  })
  
  function initLeafletMap() {
  const map = L.map('map').setView([37.0902, -95.7129], 4)

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
  }).addTo(map)

  vehicles.value.forEach((v) => {
    const marker = L.marker([v.lat, v.long]).addTo(map)
    marker.bindPopup(`
      <div class='p-2'>
        <h2 class='font-bold mb-1'>${v.model}</h2>
        <p>Prix : $${v.price}</p>
        <p>Lat : ${v.lat.toFixed(2)}, Long : ${v.long.toFixed(2)}</p>
      </div>
    `)
  })
}
  </script>
  
  <style lang="css">
  @import 'leaflet/dist/leaflet.css';
  </style>
  