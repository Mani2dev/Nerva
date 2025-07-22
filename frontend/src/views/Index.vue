<script setup>
    import { ref, onMounted } from 'vue'
    import ChartView from '@/components/blocks/ChartView.vue'
    import RecentLog from '@/components/blocks/RecentLog.vue'
    import logData from '@/data/demo/logs.json' // direct import, no fetch

    const logs = ref(logData.slice(-100).reverse())

</script>

<template>
    <section class="main--window">
        <div class="charts--container">
            <ChartView />
            <ChartView />
        </div>

        <div class="body--main">
            <section class="logs--container">
                <div class="logs--title">
                    <h2>Recent Activities</h2>
                </div>
                <div class="logs--content">
                    <div class="logs--holder">
                        <RecentLog v-for="log in logs" :key="log.timestamp + log.ip" :log="log" />
                    </div>
                </div>
            </section>
            <!-- Containers & Mem usage Will Go Here -->
        </div>

    </section>
</template>

<style scoped>
    .main--window {
        overflow: hidden;
        width: 100%;
        padding: 2%;
        height: 100vh;
    }

    .charts--container {
        margin-bottom: 50px;
        width: 100%;
        display: flex;
        gap: 2em;
        justify-content: space-between;
        align-items: stretch;
    }

    .body--main {
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 2em;
        justify-content: space-between;
        align-items: flex-start;
    }

    .logs--container {
        width: 100%;
        height: 50%;
        overflow: hidden;
        position: relative;
        padding: 10px;
        border: solid 1px var(--border-color);
    }

    .logs--title {
        margin-bottom: 20px;
    }

    .logs--content {
        height: 100%;
        overflow-y: scroll;
    }
</style>