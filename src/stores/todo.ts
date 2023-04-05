import { defineStore } from 'pinia'
import { fetchGet } from '../hooks/fetchMethods.ts';

export interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  }

  interface State {
    todoList: Todo[],
    isFetchingTodoList: boolean
    hasTodoListFetched: boolean
  }

export const useTodoStore = defineStore('todo', {
  state: (): State => ({
    todoList: [],
    isFetchingTodoList: false,
    hasTodoListFetched: false,
  }),
  getters: {
    getTodoListCount: (state) => state.todoList.length
  },
  actions: {
    async fetchTodoList() {
      if (this.hasTodoListFetched) return
      this.isFetchingTodoList = true
      try {
        const data = await fetchGet('https://jsonplaceholder.typicode.com/todos')
        this.todoList = data
        this.hasTodoListFetched = true
      } catch (error) {
        console.log(error)
      } finally {
        this.isFetchingTodoList = false
      }
    },
    async deleteTodo(){

    }
  },
})
