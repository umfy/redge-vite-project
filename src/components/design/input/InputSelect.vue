<script setup lang="ts">
import { defineProps, defineEmits, computed, ref } from 'vue'

interface Option {
  label: string
  value: string | number
}

const props = defineProps<{
  modelValue: string | number
  label: string
  options: Option[]
}>()

const emit = defineEmits(['update:modelValue'])
const modelValueComputed = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

let inputIsFocused = ref(false)
</script>
<template>
  <div class="label">{{ props.label }}</div>
  <select v-model="modelValueComputed" class="select">
    <option v-for="option of options" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<style scoped>
.label {
  padding-inline: 1rem;
}
.select {
  width: 100%;
  margin-block: 1rem;
  padding: 1.2rem 2rem;
  box-sizing: border-box;
  border-radius: 10px;
  font-size: 1.2rem;
  color: var(--color-dark-shade);
  background-color: var(--color-light);
  border: 2px solid var(--color-medium);
}

.select:focus {
  outline: none;
  border: 2px solid var(--color-primary);
  box-shadow: 0 5px 10px var(--color-shadow-light);
}
</style>
