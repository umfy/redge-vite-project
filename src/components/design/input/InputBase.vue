<template>
  <div class="wrapper">
    <textarea type="text" placeholder="Komentarz" v-model="message"></textarea>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed, ref } from 'vue';

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits(['update:modelValue']);
const message = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

let inputIsFocused = ref(false);
</script>

<style scoped>
textarea {
  resize: none;
  font-family: inherit;
  width: 100%;
  height: 8rem;
  margin: auto;
  margin-block: 1rem;
  padding: 1.2rem 2rem;
  box-sizing: border-box;
  border-radius: 20px;
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--color-primary-shade);
  background-color: var(--color-light);
  border: 2px solid var(--color-medium);
}
textarea:focus {
  outline: none !important;
  border: 2px solid var(--color-primary-tint);
  box-shadow: 0 5px 10px var(--color-shadow-light);
}
</style>
