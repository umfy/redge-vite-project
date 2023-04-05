<script setup lang="ts">
import { defineProps, defineEmits, computed, ref } from 'vue'

const props = defineProps<{
  modelValue: string
  label: string
}>()

const emit = defineEmits(['update:modelValue'])
const message = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

let inputIsFocused = ref(false)
</script>
<template>
  <div class="label">{{ props.label }}</div>
  <input
    class="input"
    type="text"
    v-model="message"
    @focus="inputIsFocused = true"
    @blur="inputIsFocused = false"
  />
</template>

<style scoped>
.label {
  padding-inline: 1rem;
}
.input {
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
.input:focus {
  outline: none;
  border: 2px solid var(--color-primary);
  box-shadow: 0 5px 10px var(--color-shadow-light);
}
</style>
