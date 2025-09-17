<script setup>
import { ref, computed } from "vue";
import Card from "@/components/blocks/Card.vue";
import Input from '@/components/blocks/Input.vue'
import Button from '@/components/blocks/Button.vue'

let agentStatus, honeypotStatus = ref(false)

const toggleAgentConfigurator = () => {
  if (agentStatus.value == false) {
    agentStatus.value == true
  }
  else {
    agentStatus.value == false
  }
}

const toggleHoneyPotStore = () => {
  if (honeypotStatus.value == false) {
    honeypotStatus.value == true
  }
  else {
    honeypotStatus.value == false
  }
}

</script>

<template>
  <!-- =========================================================
       Agent Configurator, Honeypot Store, Card Details ... 
       components are placed on the top for easier 'maintaince'
       Placement dosent play that big of a role but it is certainly
       easier to find them on top of the template then somewhere
       in the middle later on if you need to remove them or edit.
  ========================================================== -->


  <!-- =========================================================
       PAGE CONTAINER
       Wraps the entire Honeypots page content
  ========================================================== -->
  <section class="honeypots--container">

    <!-- =====================================================
         HEADER: Title + subtitle (left) and action icons (right)
    ====================================================== -->
    <div class="hp--header">

      <!-- -----------------------------------------------
           HEADER: Title block
      ------------------------------------------------ -->
      <div class="hp--title">
        <h1>Honeypots</h1>
        <p>Deploy traps, watch traffic, catch gremlins.</p>
      </div>
      <!-- --------------- end: HEADER title --------------- -->

      <!-- -----------------------------------------------
           HEADER: Action buttons (icon-only)
      ------------------------------------------------ -->
      <div class="hp--action">
        <div style="border: solid 1px var(--border-color);" class="hp--action--btn" @click="toggleAgentConfigurator()">
          <i class="hgi hgi-stroke hgi-police-cap"></i>
        </div>

        <div style="border: solid 1px var(--border-color);" class="hp--action--btn" @click="toggleHoneyPotStore()">
          <i class="hgi hgi-stroke hgi-honey-02"></i>
        </div>
      </div>
      <!-- --------------- end: HEADER actions -------------- -->

    </div>
    <!-- ================== end: HEADER =================== -->

    <!-- =====================================================
         STATS STRIP: three small cards (Total / Active / Alerts)
    ====================================================== -->
    <div class="hp--stats">
      <Card>
        <div class="hp--card--content">
          <p>Total</p>
          <span>25</span>
        </div>
      </Card>

      <Card>
        <div class="hp--card--content">
          <p>Active</p>
          <span>18</span>
        </div>
      </Card>

      <Card>
        <div class="hp--card--content">
          <p>Alerts</p>
          <span>221</span>
        </div>
      </Card>
    </div>
    <!-- =============== end: STATS STRIP ================= -->

    <!-- =====================================================
         TOOLBAR: search input + filters + refresh button
    ====================================================== -->
    <div class="hp--search--container">

      <!-- -----------------------------------------------
           TOOLBAR: Search input (left)
      ------------------------------------------------ -->
      <div class="hp--input--content">
        <Input style="padding: 10px 5px;
        background: var(--bg-sec);
        border: solid 1px var(--border-color);
        border-radius: 6px;
        font-size: var(--font-nm);
        " placeholder="Search by | type | name | id | status" />
      </div>
      <!-- --------------- end: TOOLBAR search ------------- -->

      <!-- -----------------------------------------------
           TOOLBAR: Filters + Refresh (right group)
      ------------------------------------------------ -->
      <div class="hp--filter--content">

        <!-- Filter: Type -->
        <div class="hp--filter--box">
          <label for="type">Type</label>
          <select name="type" id="typ">
            <option value="All">All</option>
            <option value="SSH">SSH</option>
            <option value="HTTPW">HTTP / Web</option>
            <option value="RDP">RDP</option>
            <option value="MySQL">MySQL</option>
            <option value="MSSQL">MSSQL</option>
            <option value="FTP">FTP</option>
            <option value="SMTP">SMTP</option>
            <option value="Telnet">Telnet</option>
          </select>
        </div>
        <!-- end: Filter Type -->

        <!-- Filter: Status -->
        <div class="hp--filter--box">
          <label for="status">Status</label>
          <select name="stt" id="typ">
            <option value="Active">Active</option>
            <option value="Offline">Offline</option>
            <option value="Depracted">Depracted</option>
          </select>
        </div>
        <!-- end: Filter Status -->

        <!-- Toolbar: Refresh button -->
        <div class="hp--refresh--bx">
          <Button style="background: var(--bg-sec); border: 1px solid var(--border-color);" class="btn">Refresh</Button>
        </div>
        <!-- end: Refresh button -->

      </div>
      <!-- --------------- end: TOOLBAR right group -------- -->

    </div>
    <!-- ================== end: TOOLBAR =================== -->

    <div class="honeypots--content">
      <div class="hp-item" v-for="i in 10" :key="i">
        <Card>
          <div class="Card--header">
            <div class="status--bulb"></div>

            <div class="service--name">
              <p>AWS - Hozna 19b</p>
            </div>

            <div class="Card--header--status">
              <span class="">Error</span>
            </div>
          </div>

          <div class="service--body--content">
            <div>
              <span>Type: </span> <span>SSH</span>
            </div>

            <div>
              <span>IP: </span> <span>194.223.22.11</span>
            </div>
            <div>
              <span>Agent: </span> <span>agent-msw2</span>
            </div>
          </div>

          <div class="service--body--content--footer">

            <div class="sbc--btn">
              <p>Details</p>
            </div>

            <div class="sbc--btn">
              <p>Events</p>
            </div>

            <div class="sbc--btn">
              <p>Edit</p>
            </div>

          </div>

        </Card>
      </div>
    </div>


  </section>
  <!-- ================= end: PAGE CONTAINER =============== -->
</template>

<style scoped>
/* =========================================================
   PAGE LAYOUT WRAPPER
========================================================= */
.honeypots--container {
  padding: 3%;
  width: 100%;
  height: 100%;
  position: relative;
}

/* =========================================================
   HEADER: container, title, actions
========================================================= */
.hp--header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hp--title {
  position: relative;
}

.hp--title h1 {
  margin-bottom: 5px;
}

.hp--title p {
  font-size: var(--font-sm);
  opacity: 80%;
}

.hp--action {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
}

.hp--action--btn {
  padding: 15px;
  cursor: pointer;
  transition: .3s ease;
  background: var(--bg-sec);
  border-radius: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}

.hp--action--btn:hover {
  background: var(--box-hover-bg);
}

.hp--action--btn i {
  font-size: var(--font-md);
}

/* ======================= end: HEADER ==================== */

/* =========================================================
   STATS STRIP (3-column grid of small cards)
========================================================= */
.hp--stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin: 50px 0;
}

.hp--card--content p {
  opacity: .7;
  font-size: var(--font-xsm);
  margin-bottom: 10px;
}

.hp--card--content span {
  font-size: var(--font-nm);
  font-weight: 700;
}

/* ==================== end: STATS STRIP ================== */

/* =========================================================
   TOOLBAR: search + filters layout
========================================================= */
.hp--search--container {
  margin-top: 25px;
  width: 100%;
  display: flex;
  gap: 1.5em;
}

.hp--input--content {
  width: 70%;
}

.hp--filter--content {
  display: flex;
  align-items: center;
  gap: 1em;
}

.hp--filter--box {
  display: flex;
  align-items: center;
  gap: .5em;
}

/* ======================= end: TOOLBAR =================== */

/* =========================================================
   Honeypots grid
========================================================= */
/* =========================================================
   Honeypots grid: 4 cards per row
========================================================= */
.honeypots--content {
  margin: 25px 0;
  display: grid;

  /* fixed 4 columns */
  grid-template-columns: repeat(4, 1fr);

  gap: 1em;
  align-items: stretch;
}

.honeypots--content .hp-item {
  display: flex;
}

.honeypots--content .hp-item>* {
  width: 100%;
}


.Card--header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5em;
  width: 100%;
}

.status--bulb {
  position: relative;
}

.status--bulb {
  position: relative;
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--hp-status-error);
  /* or var(--success-color) */
  /* softer halo; huge spread causes the “weird” look */
  box-shadow: 0 0 120px 20px var(--hp-status-error-glow);
}

.Card--header--status {
  position: relative;
}

.Card--header--status span {
  border-radius: 30px;
  padding: 2px 7px;
  opacity: .7;
  background: var(--bg-sec);
  font-size: var(--font-xsm);
  border: solid 1px var(--hp-status-error);
}

.service--body--content {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: .5em;
  margin: 15px 0 12px;
}

.service--body--content div span:first-child {
  opacity: .7;
  font-size: var(--font-sm);
}

.service--body--content--footer {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1em;
}

.service--body--content--footer .sbc--btn {
  border: solid 1px var(--border-color);
  text-align: center;
  padding: 5px 15px;
  border-radius: 6px;
  cursor: pointer;
  background: var(--bg-sec);
  transition: .3s ease;
}
</style>
