<template>
    <footer class="bg-gray-100 py-4 text-center">
      <p class="text-gray-500">&copy; {{ currentYear }} Spark Vehicles Explorer | Made with ❤️ by ton équipe</p>
    </footer>
  </template>
  
  <script setup lang="ts">
  const currentYear = new Date().getFullYear();
  </script>
  