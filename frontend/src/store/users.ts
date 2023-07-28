import { defineStore } from 'pinia'

interface State {
  users: UserData[];
  loggedInUser: UserData | null;
}

interface UserData {
  id:         string
  firstName:  string
  lastName:   string
  email:      string
  password:   string
  createdAt:  Date
  isSelected: boolean
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
    async fetchUsers(): Promise<void> {
      try {
        const response = await fetch('http://localhost:3330/api/users');
        const usersData = await response.json();

        this.users = usersData;
      } catch (error) {
        console.error(error)
      }
    },
    setLoggedInUser(user: UserData | null):void {
      this.loggedInUser = user;
    },
    clearLoggedInUser(): void {
      this.loggedInUser = null;
    },
    clearDeletedUser(user: UserData | null): void {
      if (user) {
        const deletedUserIndex = this.users.findIndex((deletedUser) => deletedUser.id === user.id);

        if (deletedUserIndex !== -1) {
          this.users.splice(deletedUserIndex, 1);
        }
      }
    },
  }
})
