<script setup>

</script>

<template>
    <section class="Card">
        <slot />
    </section>
</template>

<style scoped>
    .Card {
        position: relative;
        overflow: hidden;
        width: 100%;
        padding: 15px;
        border-radius: 6px;
        border: 1px solid var(--border-color);
        background: var(--bg-sec);
    }
</style>