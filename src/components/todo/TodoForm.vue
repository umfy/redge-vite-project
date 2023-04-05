<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import { Todo, TodoClass, useTodoStore } from '../../stores/todo'
import { useUserStore } from '../../stores/user'
import ToggleBase from '../design/button/ToggleBase.vue'
import InputNamed from '../design/input/InputNamed.vue'
import InputSelect from '../design/input/InputSelect.vue'
import ButtonBase from '../design/button/ButtonBase.vue'


const props = withDefaults(defineProps<{
  todoId: number | null
}>(), {
  todoId: undefined,
})

const emit = defineEmits(['submit'])


const todoStore = useTodoStore()
todoStore.fetchTodoList()

const userStore = useUserStore()
userStore.fetchUserList()
const mappedUsers = ref(
  userStore.userList.map((user) => ({ value: user.id, label: user.name }))
)

const formData = ref(new TodoClass())
if (props.todoId) {
  formData.value = new TodoClass(todoStore.getTodoById(props.todoId))
}

function submitTodo(todo: Todo){
  emit('submit')
  if(todo.id) {
    // edit
    todoStore.editTodo(todo)
    return
  }
  todoStore.addTodo(todo)
}
</script>

<template>
  <form class="form">
    <InputSelect
      :options="mappedUsers"
      label="Użytkownik"
      v-model:model-value="formData.userId"
    ></InputSelect>
    <InputNamed label="Opis" v-model:model-value="formData.title"></InputNamed>
    <div class="center-content">
      <ToggleBase
        label="Zakończone"
        v-model:model-value="formData.completed"
      ></ToggleBase>
    </div>
  </form>
  <div class="action-buttons">
    <ButtonBase @click="submitTodo(formData)">Zapisz</ButtonBase>
  </div>
</template>

<style scoped>
.center-content {
  padding-block: 1.5rem;
  display: flex;
  justify-content: center;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  height: 2rem;
}
.form {
  overflow: auto;
  height: calc(100% - 2rem);
}
</style>
