import { defineStore } from 'pinia'

interface Geo {
  lat: string
  lng: string
}
interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}
interface Company {
  name: string
  catchPhrase: string
  bs: string
}
export interface User {
  id: number
  name: string
  username: string
  email: string
  address: Address
  phone: string
  website: string
  company: Company
}

interface State {
  userList: User[]
  isFetchingUserList: boolean
  hasUserListFetched: boolean
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    userList: [],
    isFetchingUserList: false,
    hasUserListFetched: false,
  }),
  getters: {
    getUserListCount: (state) => state.userList.length,
    getUserById: (state) => {
      return (userId) => state.userList.find((user) => user.id === userId)
    },
  },
  actions: {
    async fetchUserList() {
      if (this.hasUserListFetched) return
      this.isFetchingUserList = true
      try {
        const result = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await result.json()
        this.userList = data
        this.hasUserListFetched = true
      } catch (error) {
        console.log(error)
      } finally {
        this.isFetchingUserList = false
      }
    },
  },
})
