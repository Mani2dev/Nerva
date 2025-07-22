<script setup>
import { ref, onMounted } from 'vue'

const isCompactSidebar = ref(false)
const sidebarRef = ref(null)

onMounted(() => {
  const observer = new ResizeObserver(entries => {
    for (const entry of entries) {
      const sidebarWidth = entry.contentRect.width
      const parentWidth = entry.target.parentElement?.clientWidth || 1 // Failsafe
      const sidebarPercent = (sidebarWidth / parentWidth) * 100

      isCompactSidebar.value = sidebarPercent <= 10 // ← check against % here!
    }
  })

  if (sidebarRef.value) {
    observer.observe(sidebarRef.value)
  }
})
</script>



<template>
  <nav class="sidebar--container" ref="sidebarRef">
    <div class="sidebar--logo">
        <h1>B</h1>
    </div>
    
    <div class="sidebar--linkers">
        
        <div class="linker--box">
            <div class="linker--icon">
                <i class="hgi hgi-stroke hgi-home-02"></i>
            </div>
            <p :class="{ hidden: isCompactSidebar }">Home</p>
        </div>
        <div class="linker--box">
            <div class="linker--icon">
                <i class="hgi hgi-stroke hgi-nano-technology"></i>
            </div>
            <p :class="{ hidden: isCompactSidebar }">Containers</p>
        </div>
        <div class="linker--box">
            <div class="linker--icon">
                <i class="hgi hgi-stroke hgi-honey-01"></i>
            </div>
            <p :class="{ hidden: isCompactSidebar }">Honeypots</p>
        </div>
        <div class="linker--box">
            <div class="linker--icon">
                <i class="hgi hgi-stroke hgi-license"></i>
            </div>
            <p :class="{ hidden: isCompactSidebar }">Logs</p>
        </div>
        <div class="linker--box">
            <div class="linker--icon">
                <i class="hgi hgi-stroke hgi-user"></i>
            </div>
            <p :class="{ hidden: isCompactSidebar }">User</p>
        </div>
        <div class="linker--box">
            <div class="linker--icon">
                <i class="hgi hgi-stroke hgi-dashboard-circle-settings"></i>
            </div>
            <p :class="{ hidden: isCompactSidebar }">Settings</p>
        </div>

         <div class="linker--box linker--danger">
            <div class="linker--icon">
                <i class="hgi hgi-stroke hgi-danger"></i>
            </div>
            <p :class="{ hidden: isCompactSidebar }">Danger Zone</p>
        </div>
    
    </div>

    <div class="sidebar--fotter">

    </div>

  </nav>
</template>

<style scoped>
    .sidebar--container {
        width: calc(100% - 95%);
        height: 100vh;
        position: relative;
        transition: .3s ease-in-out;
        border-right: solid 1px var(--border-color);

        display: flex;
        padding: 1em 1em;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }
    .sidebar--container .sidebar--logo h1 {
        font-size: var(--font-2xl);
    }
    .sidebar--container .linker--box {
        display: flex;
        margin-bottom: 25px;
        gap: 1em;
        align-items: center;
        cursor: pointer;
        transition: --s .3s ease;
        justify-content: flex-start;
    }
    .sidebar--container .linker--danger .linker--icon {
        border: 1px solid red;
    }
    .sidebar--container .linker--danger * {
        color: red;
    }
    .linker--box .linker--icon {
        padding: 10px;
        transition: --s .3s ease;
        border: solid 1px var(--border-color-full);
        --s: 5px;
        mask: 
            conic-gradient(#000 0 0) content-box,
            conic-gradient(at var(--s) var(--s),#0000 75%,#000 0) 
            0 0/calc(100% - var(--s)) calc(100% - var(--s));
    }
    .sidebar--container .linker--box .linker--icon:hover {
        --s: 10px;
    }
    .sidebar--container .linker--box i {
        font-size: var(--font-md);
    }
    .sidebar--container .linker--box p {
        transition: opacity 0.2s ease-in-out;
    }
    .sidebar--container .linker--box p.hidden {
        display: none;
    /* Or opacity: 0 if you want fancy fade instead of hard cut */
    }
</style>