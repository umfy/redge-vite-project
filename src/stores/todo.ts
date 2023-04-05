import { defineStore } from 'pinia'
import {
  fetchGet,
  fetchPut,
  fetchDelete,
  fetchPost,
} from '../hooks/fetchMethods.ts'

export interface Todo {
  userId: number
  id?: number | null
  title: string
  completed: boolean
}

export class TodoClass implements Todo {
  userId: number
  title: string
  completed: boolean
  id?: number | null

  constructor(todo: Partial<Todo> = {}) {
    this.userId = todo.userId ?? 1
    this.title = todo.title ?? ''
    this.completed = todo.completed ?? false
    this.id = todo.id
  }
}

interface State {
  todoList: Todo[]
  isLoading: boolean
  hasTodoListFetched: boolean
}

export const useTodoStore = defineStore('todo', {
  state: (): State => ({
    todoList: [],
    isLoading: false,
    hasTodoListFetched: false,
  }),
  getters: {
    getTodoListCount: (state) => state.todoList.length,
    getTodoById: (state) => {
      return (todoId) => state.todoList.find((todo) => todo.id === todoId)
    },
  },
  actions: {
    async fetchTodoList() {
      if (this.hasTodoListFetched) return
      this.isLoading = true
      try {
        const data = await fetchGet(
          'https://jsonplaceholder.typicode.com/todos'
        )
        this.todoList = data
        this.hasTodoListFetched = true
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading = false
      }
    },
    async deleteTodo(todoId: number) {
      this.isLoading = true
      try {
        const data = await fetchDelete(
          `https://jsonplaceholder.typicode.com/todos/${todoId}`
        )
        this.todoList = this.todoList.filter((todo) => todo.id !== todoId)
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading = false
      }
    },
    async editTodo(todo: Todo) {
      this.isLoading = true
      try {
        const data = await fetchPut(
          `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
          todo
        )
        if (data) {
          // the api will return undefined when editing a new item (id 200+)
          const index = this.todoList.findIndex((el) => el.id === data.id)
          if (index !== -1) {
            this.todoList[index] = data
          }
        } else {
          // this is mocked behavior 👇
          const index = this.todoList.findIndex((el) => el.id === todo.id)
          if (index !== -1) {
            this.todoList[index] = todo
          }
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading = false
      }
    },
    async addTodo(todo: Todo) {
      this.isLoading = true
      try {
        const data = await fetchPost(
          `https://jsonplaceholder.typicode.com/todos`,
          todo
        )
        // every new item will be given id of 201 which will cause bugs in edits / deletes
        data.id = this.todoList.length + 1 // this is maintaining unique ids
        this.todoList.unshift(data)
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading = false
      }
    },
  },
})
