<script setup>
    import { ref, onMounted, onUnmounted, reactive } from 'vue'
    import ContainerBlock from '@/components/blocks/ContainerBlock.vue'
    import Input from '@/components/blocks/Input.vue'

onMounted(async () => {
    try {
        const res = await fetch('http://127.0.0.1:3000/docker/getc/');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json(); // assuming your API returns JSON
        containers.value = data;
    } catch (err) {
        console.error('Failed to fetch containers:', err);
    }
})


</script>

<template>
    <section class="docker--container--main">

        <div class="docker--cm--title">
            <div class="docker--cm--title--txt">
                <h1>Docker Containers</h1>
                <p>This panel gives you full control over deployed Docker containers — edit, terminate, reboot, or
                    siphon logs like it’s second nature.</p>
            </div>
            <div class="docker--cm--title--inp">
                <Input 
                    style="width: 60%; background: transparent;"
                    placeholder="Search containers by ID or name" />
            </div>
        </div>

        <div class="docker--containers--contnet">
            <ContainerBlock />
        </div>

    </section>
</template>

<style scoped>
    .docker--container--main {
        padding: 2%;
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
    }

    .docker--cm--title {
        display: flex;
        align-items: center;
        width: 100%;
        gap: 2em;
        justify-content: space-between;
        margin-bottom: 50px;
    }

    .docker--cm--title h1 {
        margin-bottom: 10px;
    }

    .docker--cm--title p {
        font-size: var(--font-sm);
        opacity: 70%;
    }

    .docker--cm--title--inp {
        width: 50%;
    }

    .docker--containers--contnet {
        width: 100%;
        height: 100%;
    }
</style>