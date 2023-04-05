<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { Todo } from '../../stores/todo'
import { useUserStore } from '../../stores/user'
import ButtonBase from '../design/button/ButtonBase.vue'
import CardBase from '../design/card/CardBase.vue'
const props = defineProps<{
  todo: Todo
}>()

const emit = defineEmits<{
  (e: 'deleteTodo', id: number | null): void
  (e: 'editTodo', id: number | null): void
}>()

const userStore = useUserStore()
userStore.fetchUserList()
</script>

<template>
  <CardBase>
    <div class="item-top">
      <p class="item-author">
        {{ userStore.getUserById(props.todo.userId)?.name }}
      </p>
      <p class="item-status">
        {{ props.todo.completed ? 'Zakończono' : 'W trakcie realizacji' }}
      </p>
    </div>
    <div class="item-bottom">
      <p class="item-message">{{ props.todo.title }}</p>

      <div class="item-buttons">
        <ButtonBase @click="emit('deleteTodo', props.todo.id || null)">Usuń</ButtonBase>
        <div class="item-divider"></div>
        <ButtonBase @click="emit('editTodo', props.todo.id || null)">Edytuj</ButtonBase>
      </div>
    </div>
  </CardBase>
</template>

<style scoped>
.item-top {
  padding: 1.5rem;
  padding-inline: 2rem;
  display: flex;
}

.item-author {
  font-size: 1.2rem;
  font-weight: bold;
  margin-block: 0;
}
.item-status {
  color: var(--color-medium);
  font-weight: bold;
  margin-left: auto;
  margin-block: 0;
}
.item-bottom {
  padding-inline: 1.5rem;
}

.item-message {
  margin-top: 0;
  text-align: center;
  font-size: 0.95rem;
  font-weight: bold;
}
.item-buttons {
  display: flex;
  justify-content: flex-end;
  padding-block: 1rem;
}

.item-divider {
  height: 2rem;
  margin-inline: 1rem;
  border-right: 2px solid var(--color-medium-tint);
}
</style>
