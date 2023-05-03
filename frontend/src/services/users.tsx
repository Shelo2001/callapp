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
  loading: boolean
  errorMessage: string | null
  getUsers: () => Promise<void>
  getUserById: (id: number) => Promise<User>
  deleteUser: (id: number) => Promise<void>
  addUser: (data: object) => Promise<void>
  updateUser: (data: object, id: number) => Promise<void>
}

const userStore = createStore<UserStore>((set) => ({
  users: [],
  loading: false,
  async getUsers() {
    set({ loading: true })
    try {
      const response: AxiosResponse<User[]> = await axios.get<User[]>(
        '/api/users'
      )
      set({ users: response.data, loading: false })
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
      window.location.reload()
    } catch (error) {
      console.error(error)
    }
  },
  async addUser(data: object) {
    try {
      const response: AxiosResponse<User> = await axios.post<User>(
        `/api/users/create`,
        data
      )
      if (response.data) {
        window.location.reload()
      }
    } catch (error) {
      if (error instanceof Error) {
        set({ errorMessage: error.response.data.message })
        setTimeout(() => {
          set({ errorMessage: null })
        }, 3000)
      }
    }
  },

  async updateUser(data: object, id: number) {
    try {
      const response: AxiosResponse<User> = await axios.put<User>(
        `/api/users/user/${id}`,
        data
      )
      if (response.data) {
        window.location.href = '/users'
      }
    } catch (error) {
      console.log(error)
    }
  },
}))

export default userStore
