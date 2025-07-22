<script setup>
  import Sidebar from '@/components/global/Sidebar.vue'
  document.documentElement.setAttribute('data-theme', 'dark')  // Or 'light'
</script>

<template>
  <main>
    <Sidebar v-if="!$route.meta.hideSidebar" />
    <RouterView  />
  </main>
</template>

<style scoped>
  main {
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    position: relative;
  }
</style>