<script setup>
import { markNotify, clearNotify } from "@/utils/notify";
import { ref, onMounted } from 'vue'
import { requestWhoami, getCachedUser } from '@/utils/requestAuth.js'

const user = ref(getCachedUser()) // might be null on first load
onMounted(async () => {
  if (!user.value) {
    const { ok, data } = await requestWhoami()
    if (ok) user.value = data.user
  }
})

// new events on Honeypots
markNotify("nav-honeypots", 3, "is-crit");

// user navigates to Honeypots → clear
clearNotify("nav-honeypots");
</script>

<template>
  <nav class="sidebar--container">
    <div class="sidebar--content">
      <div class="sidebar--logo"></div>

      <div class="sidebar--linkers--container">
        <div class="sidebar--linker--box">
          <i class="hgi hgi-stroke hgi-home-01"></i>
          <p>Home</p>
        </div>

        <div class="sidebar--linker--box">
          <i class="hgi hgi-stroke hgi-honey-01"></i>
          <p>Honeypots</p>
        </div>

        <div class="sidebar--linker--box">
          <i class="hgi hgi-stroke hgi-internet"></i>
          <p>Traffic</p>
        </div>

        <div class="sidebar--linker--box">
          <i class="hgi hgi-stroke hgi-note-01"></i>
          <p>Logs</p>
        </div>

        <div class="sidebar--linker--box">
          <i class="hgi hgi-stroke hgi-alert-02"></i>
          <p>Incidents</p>
        </div>

        <div class="sidebar--linker--box">
          <i class="hgi hgi-stroke hgi-mail-01"></i>
          <p>Phishing</p>
        </div>

        <div class="sidebar--linker--box">
          <i class="hgi hgi-stroke hgi-health"></i>
          <p>Health</p>
        </div>

        <div class="sidebar--linker--box">
          <i class="hgi hgi-stroke hgi-radar-01"></i>
          <p>Intel</p>
        </div>

        <div class="sidebar--linker--box anim">
          <i class="hgi hgi-stroke hgi-book-02"></i>
          <p>Rules</p>
        </div>

        <div class="sidebar--linker--box">
          <i class="hgi hgi-stroke hgi-complaint"></i>
          <p>Reports</p>
        </div>

        <div class="sidebar--linker--box">
          <i class="hgi hgi-stroke hgi-settings-03"></i>
          <p>Settings</p>
        </div>
      </div>

      <div class="sidebar--footer">
        <div class="sf--box">
          <p>{{ user?.username }}</p>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.sidebar--container {
  position: relative;
  top: 0;
  left: 0;
  width: 10%;
  height: 100%;
  border-right: solid 1px var(--border-color);
}
.sidebar--content {
  padding: var(--padding-05);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  padding: .5em;
}
.sidebar--linkers--container {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 1em;
}
.sidebar--linker--box {
  width: 100%;
  cursor: pointer;
  transition: .3s ease;
  display: flex;
  gap: .8em;
  padding: 10px;
  align-items: center;
  justify-content: flex-start;

  border: solid 1px transparent;
  position: relative;
  overflow: hidden;
  border-radius: 6px;
}
.sidebar--linker--box:hover {
  border: solid 1px var(--border-color);
  backdrop-filter: blur(12px);
  background: var(--box-hover-bg);
}
.sidebar--linker--box i {
  font-size: var(--font-md);
}
.sidebar--linker--box p {
  font-size: var(--font-nm);
}

.sidebar--footer {
  padding: 0.5em;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}
.sf--box {
  border-radius: 6px;
  border: solid 1px var(--border-color);
  background: var(--bg-sec);
  padding: 15px 10px;
  width: 100% 100%;
}
</style>
