<template>
    <footer class="bg-gray-100 py-4 text-center">
      <p class="text-gray-500">&copy; {{ currentYear }} Craigslist Vehicles Explorer | Made with ❤️ by JMV BCR Coders</p>
    </footer>
  </template>
  
  <script setup lang="ts">
  const currentYear = new Date().getFullYear();
  </script>
  