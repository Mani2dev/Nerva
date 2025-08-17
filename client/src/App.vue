<script setup>
    import Sidebar from '@/components/global/Sidebar.vue'
    import TopBar from '@/components/global/TopBar.vue'
</script>

<template>
    <main class="global--cont">
        <Sidebar />

        <div class="global--content">
            <TopBar />
            <RouterView/>
        </div>
    </main>
</template>

<style scoped>
    .global--cont {
        display: flex;
        align-items: flex-start;
        width: 100vw;
        height: 100vh;
    }
</style>