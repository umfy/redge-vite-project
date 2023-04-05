<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  isLoading: boolean
}>()
</script>

<template>
  <transition name="fade">
  <div v-if="props.isLoading" class="loader">
    <div class="lds-dual-ring"></div>
  </div>
</transition>

</template>

<style scoped>
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: ' ';
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid var(--color-light);
  border-color: var(--color-light) transparent var(--color-light) transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loader {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: rgba(var(--color-dark-rgb), 0.4);
  display: flex;
  justify-content: center;
  place-items: center;
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
