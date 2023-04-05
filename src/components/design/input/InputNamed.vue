<template>
  <div class="wrapper">
    <input
      class="named-input"
      type="text"
      v-model="message"
      @focus="inputIsFocused = true"
      @blur="inputIsFocused = false"
    />
    <div class="label">{{props.name}}</div>
    <div class="label-border" :class="{ 'label-border-focus': inputIsFocused }">{{props.name}}</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed, ref } from 'vue';

const props = defineProps<{
  modelValue: string;
  name: string;
}>();

const emit = defineEmits(['update:modelValue']);
const message = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

let inputIsFocused = ref(false);
</script>

<style scoped>
* {
  --input-mx: 1rem;
}
.named-input {
  width: 100%;
  margin: auto;
  margin-block: var(--input-mx);
  padding: 1.2rem 2rem;
  box-sizing: border-box;
  border-radius: 50px;
  font-size: 1.2rem;
  color: var(--color-primary-shade);
  background-color: var(--color-light);
  border: 2px solid var(--color-medium);
}
.named-input:focus {
  outline: none;
  border: 2px solid var(--color-primary-tint);
  box-shadow: 0 5px 10px var(--color-shadow-light);
}
.wrapper {
  position: relative;
}
.label {
  position: absolute;
  top: calc(var(--input-mx) - 0.5rem);
  left: 2rem;
  font-size: 0.8rem;

  /* border: 1px solid black; */
  border-radius: 50px;
  padding: 0 10px;

  background-color: var(--color-light);
}
.label-border {
  position: absolute;
  top: calc(var(--input-mx) - 0.5rem - 2px);
  left: calc(2rem - 2px);
  font-size: 0.8rem;

  border: 2px solid var(--color-medium);
  border-radius: 50px;
  padding: 0 10px;

  background-color: var(--color-light);
  z-index: -10;
}
.label-border-focus {
  border: 2px solid var(--color-primary-tint);
}
</style>
