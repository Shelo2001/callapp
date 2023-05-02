import { createStore } from 'zustand'
import axios, { AxiosResponse } from 'axios'

interface User {
  id: number
  name: string
  email: string
  gender: string
  address: {
    street: string
    city: string
  }
  phone: string
}

interface UserStore {
  users: User[]
  user: User
  getUsers: () => Promise<void>
  getUserById: (id: number) => Promise<User>
  deleteUser: (id: number) => Promise<void>
}

const userStore = createStore<UserStore>((set) => ({
  users: [],
  async getUsers() {
    try {
      const response: AxiosResponse<User[]> = await axios.get<User[]>(
        '/api/users'
      )
      set({ users: response.data })
    } catch (error) {
      console.error(error)
    }
  },
  async getUserById(id: number) {
    try {
      const response: AxiosResponse<User> = await axios.get<User>(
        `/api/users/user/${id}`
      )
      set({ user: response.data })
    } catch (error) {
      console.error(error)
    }
  },
  async deleteUser(id: number) {
    try {
      const response: AxiosResponse<User> = await axios.delete<User>(
        `/api/users/user/${id}`
      )
      set({ user: response.data })
    } catch (error) {
      console.error(error)
    }
  },
}))

export default userStore
