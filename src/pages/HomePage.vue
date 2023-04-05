<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '../stores/todo.ts';

let todoList = ref('hello');

const todoStore = useTodoStore()
if (!todoStore.hasTodoListFetched) todoStore.fetchTodoList();

</script>

<template>
    <h1>HOME</h1>
  <div>{{ todoStore.todoList }}</div>
</template>

<style scoped></style>
