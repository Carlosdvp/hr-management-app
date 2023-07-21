import { defineStore } from 'pinia'

interface State {
  users: UserData[];
  loggedInUser: UserData | null;
}

interface UserData {
  id: string
  firstName: string
  lastName: string
  email: string
  password: boolean
  createdAt: Date
}

export const useUserDataStore = defineStore('users', {
  state: (): State => {
    return {
      users: [],
      loggedInUser: null,
    }
  },
  getters: {},
  actions: {
    async fetchUsers() {
      try {
        const response = await fetch('http://localhost:3330/api/users');
        const usersData = await response.json();
        this.users = usersData;
        console.log('pinia store', usersData)
      } catch (error) {
        console.error(error)
      }
    },
    setLoggedInUser(user: UserData | null) {
      this.loggedInUser = user;
    },
    clearLoggedInUser() {
      this.loggedInUser = null;
    }
  }
})