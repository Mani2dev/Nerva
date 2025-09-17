<!-- App.vue -->
<script setup>
import { useRoute } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'
import TopBar from '@/components/TopBar.vue'

const route = useRoute()
</script>

<template>
  <main class="global--cont">
    <!-- only render chrome if meta.chrome !== false -->
    <Sidebar v-if="route.meta.chrome !== false" />
    <div class="global--content">
      <TopBar v-if="route.meta.chrome !== false" />
      <RouterView />
    </div>
  </main>
</template>

<style scoped>
.global--cont { display: flex; align-items: flex-start; width: 100vw; height: 100vh; }
.global--content {
  width: 100vw;
  height: 100vh;
  position: relative;
 }
</style>
