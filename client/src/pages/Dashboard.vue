<script setup>
import Card from "@/components/blocks/Card.vue";
</script>

<template>
  <main class="home--main--container">
    <div class="home--main--contnet">
      <div class="home--main--head">
        <div class="home--head--box">
          <Card>
            
          </Card>
        </div>
        <div class="home--head--box">
          <Card>
            <div class="card--content--dataholder"></div>
          </Card>
        </div>
        <div class="home--head--box">
          <Card>
            <div class="card--content--dataholder"></div>
          </Card>
        </div>
      </div>

      <div class="home--main--body">
        <Card>
          
        </Card>
      </div>

    </div>
  </main>
</template>

<style scoped>
.home--main--container {
  width: 100%;
  height: 100%;
  padding: 3%;
}
.home--main--contnet {
  width: 100%;
  height: 100%;
}
.home--main--head {
  width: 100%;
  gap: 1em;
  display: flex;
}
.home--head--box {
  width: 50%;
}

.home--main--body {
  margin-top: 50px;
}
</style>