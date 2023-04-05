<script setup lang="ts">
import TheNavbar from './components/TheNavbar.vue'
</script>

<template>
  <TheNavbar></TheNavbar>
  <div class="main-content">
    <router-view></router-view>
  </div>
</template>

<style scoped>
.main-content{
  max-width: 1280px;
  margin: auto;
}
</style>
