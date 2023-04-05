<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue'
const props = defineProps<{
  label: string
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const modelValueComputed = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>

<template>
  <div class="toggle-wrapper">
    <label class="toggle-switch">
      <input type="checkbox" v-model="modelValueComputed" />
      <span class="slider round"></span>
    </label>
    <p class="toggle-label">
      {{ props.label }}
    </p>
  </div>
</template>

<style scoped>
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  background-color: var(--color-dark);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: var(--color-light);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: var(--color-primary);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--color-primary);
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.toggle-wrapper {
  display: flex;
  place-items: center;
}
.toggle-label {
  padding-inline: 1rem;
}
</style>
