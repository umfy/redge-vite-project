<script setup lang="ts">
import { useTodoStore } from '../stores/todo.ts';
import TodoItem from '../components/todo/TodoItem.vue'


const todoStore = useTodoStore()
todoStore.fetchTodoList();

async function deleteTodo(id: number){
  console.log('data', id)
}
async function editTodo(id: number){
  console.log('editing', id)
}
</script>

<template>
  <div v-for="todo of todoStore.todoList" class="item-list">
    <TodoItem :todo="todo" @delete-todo="deleteTodo" @edit-todo="editTodo"></TodoItem>
  </div>
</template>

<style scoped>
.item-list {
  margin-inline: 4rem;
}
</style>
