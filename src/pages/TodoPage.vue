<script setup lang="ts">
import { ref, computed } from 'vue'
import { Todo, useTodoStore } from '../stores/todo'
import TodoItem from '../components/todo/TodoItem.vue'
import LoaderBase from '../components/design/loader/LoaderBase.vue'
import DialogBase from '../components/design/dialog/DialogBase.vue'
import TodoForm from '../components/todo/TodoForm.vue'
import CardBase from '../components/design/card/CardBase.vue'
import ButtonBase from '../components/design/button/ButtonBase.vue'

const todoStore = useTodoStore()
todoStore.fetchTodoList()

const activeTodoId= ref<number | null>(null)
async function deleteTodo(id: number | null) {
  if (!id) return
  todoStore.deleteTodo(id)
}
function editTodo(id: number | null) {
  if (!id) return
  activeTodoId.value = id
  isTodoFormDialogOpen.value = true
}
function addTodo(){
  activeTodoId.value = null
  isTodoFormDialogOpen.value = true
}

/* front-end pagination */
const page = ref(1)
const pageSize = ref(3)
const startIndex = ref(0)
const endIndex = ref(0)
const paginatedTodoList = computed(()=>{
  const totalPages = Math.ceil(todoStore.getTodoListCount / pageSize.value);
  if(page.value < 1) {
    page.value = 1
  } else if (page.value > totalPages){
    page.value = totalPages
  }

   startIndex.value = (page.value - 1) * pageSize.value; 
   endIndex.value = startIndex.value + pageSize.value; 
  return todoStore.todoList.slice(startIndex.value, endIndex.value)
})


const isTodoFormDialogOpen = ref(false)
</script>

<template>
  <div class="item-list">
  <CardBase class="add-card">
    <ButtonBase @click="addTodo">Dodaj nowy element</ButtonBase>
  </CardBase>
    <TodoItem v-for="todo of paginatedTodoList" 
      :todo="todo"
      @delete-todo="deleteTodo"
      @edit-todo="editTodo"
    ></TodoItem>
  </div>
  <LoaderBase :is-loading="todoStore.isLoading"></LoaderBase>
  <DialogBase label="Edycja elementu" v-model:is-open="isTodoFormDialogOpen">
    <TodoForm @submit="isTodoFormDialogOpen=false" :todoId="activeTodoId"></TodoForm
  ></DialogBase>
  <div class="pagination-controls">
    <ButtonBase @click="page--">Wstecz</ButtonBase>
    <p>{{ `Pokazywanie ${startIndex + 1} - ${endIndex} z ${todoStore.getTodoListCount}` }}</p>
    <ButtonBase @click="page++">Dalej</ButtonBase>
  </div>
</template>

<style scoped>
.item-list {
  margin-inline: 4rem;
}
.add-card {
  display: flex;
  justify-content: center;
  padding: 1.5rem;
}
.pagination-controls {
  display: flex;
  justify-content: space-evenly;
}
</style>
