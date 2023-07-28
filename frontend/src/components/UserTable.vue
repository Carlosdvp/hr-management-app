<script setup lang="ts">
import { Ref, ref } from 'vue';
import axios from 'axios';
import { User } from '@/types/User';
import { useUserDataStore } from '@/store/users';
import SearchBar from './SearchBar.vue';
import AddUser from './AddUser.vue';

const userStore = useUserDataStore();

const headerItems = ref<string[]>(['', 'Id', 'Email', 'First Name', 'Last Name']);
let API_URL = 'http://localhost:3330/api'

const users: Ref<User[]> = ref<User[]>([]);

const getUsers = async (): Promise<void> => {
  try {
    const response = await axios.get<User[]>(`${API_URL}/users`);
    users.value = response.data;
  } catch (error) {
    console.error(error)
  }

  const dbPollingInterval = 60 *60 *1000; // 1 hour

  setInterval(async () => {
    try {
      const response = await axios.get<User[]>(`${API_URL}/users`);
      users.value = response.data;
    } catch (error) {
      console.error(error)
    }
  }, dbPollingInterval);
}

const deleteUser = async () => {

  const selectedUsers = users.value.filter((user) => user.isSelected);
  if (selectedUsers.length === 0) {
    console.log('No users selected for deletion');
    return;
  }

  for (let user of selectedUsers) {
    const result = await fetch(`${API_URL}/users/${user.email}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => response.json());

    if (user) {
      console.log(`User: ${result.deletedUser.email}, deleted successfully`);
      userStore.clearDeletedUser(user);
      
      await getUsers();
    } else {
      console.log(deleteUser || 'Failed to delete user');
    }
  }
}

getUsers();

</script>

<template>
  <div class="h-[calc(100vh-50px)] max-w-[1080px] w-full mx-auto my-0 bg-gray-200 p-[20px]">
    <div class="h-[60px] flex shadow-sm px-7 pb-5 items-center justify-end">
      <SearchBar />
      <AddUser />
    </div>

    <div class="border-2 border-white p-[20px]">
      <header
        class="grid user-grid col-span-full gap-1 h-[5vh] items-center justify-between bg-slate-300"
      >
        <p 
          v-for="(headerItem, index) in headerItems"
          :key="index"
          class="font-bold p-2 text-center"
        >
          {{ headerItem }}
        </p>
      </header>

      <p v-if="users.length === 0">No users found</p>

      <div v-else class="pb-4">
        <div 
          v-for="user in users"
          :key="user.id" 
          class="bg-slate-200 grid gap-x-1 text-center user-grid border border-slate-400 my-1 py-1">
          <input 
            type="checkbox"
            v-model="user.isSelected" />
          <p class="">{{ user.id.substring(0,9) + '...' }}</p>
          <p class="">{{ user.email }}</p>
          <p class="">{{ user.firstName }}</p>
          <p class="">{{ user.lastName }}</p>
          <!-- <p class="">{{ user.password ? true : false }}</p> -->
        </div>
      </div>
      <button
        class="bg-slate-500 text-white font-semibold p-2 border border-slate-900 transsition duration-200 ease-linear hover:bg-white hover:text-black cursor-pointer"
        @click="deleteUser">Delete Selected Users</button>
    </div>
  </div>
</template>

<style scoped>
.user-grid {
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr;
}
</style>
