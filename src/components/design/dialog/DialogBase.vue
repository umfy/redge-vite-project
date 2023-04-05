<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue'
import CardBase from '../card/CardBase.vue'
import ButtonBase from '../button/ButtonBase.vue'

const props = defineProps<{
  isOpen: boolean
  label: string
}>()

const emit = defineEmits(['update:isOpen'])

const isOpenComputed = computed({
  get: () => props.isOpen,
  set: (value) => emit('update:isOpen', value),
})
</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="isOpenComputed" class="dialog-background">
        <CardBase class="dialog-content">
          <div class="dialog-head">
            <p class="dialog-head-label">{{ props.label }}</p>
            <ButtonBase
              @click="isOpenComputed = false"
              class="dialog-head-buttons"
            >
              <p class="poor-icon">+</p>
            </ButtonBase>
          </div>
          <div class="dialog-slot">
            <slot></slot>
          </div>
        </CardBase>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
.dialog-background {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: rgba(var(--color-dark-rgb), 0.4);
  display: flex;
  justify-content: center;
  place-items: center;
}
.dialog-content {
  width: calc(40vw + 200px);
  height: calc(40vh + 200px);
  max-width: 100vw;
  max-height: 100vh;
  padding-inline: 0.5rem;
  display: flex;
  flex-direction: column;
}
.dialog-head {
  display: flex;
  justify-content: space-between;
  padding-inline: 5px;
}
.dialog-head-label {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 1rem;
  padding: 0.5rem;
}
.dialog-head-buttons {
  margin-left: auto;
}
.dialog-slot {
  padding: 1rem;
  height: 100%;
  overflow: auto;
}

.poor-icon {
  margin: 0;
  padding: 0;
  font-weight: 200;
  font-size: 4rem;
  transform: rotate(45deg);
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
