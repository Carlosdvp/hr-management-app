<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { User } from '@/types/User';

const users = ref<User[]>([]);
const headerItems = ref<string[]>(['Id', 'Email', 'First Name', 'Last Name', 'Password']);

const getUsers = async (): Promise<void> => {
  try {
    const response = await axios.get<User[]>('http://localhost:3330/api/users');
    users.value = response.data;
  } catch (error) {
    console.error(error)
  }

  const dbPollingInterval = 60 *60 *1000; // 1 hour

  setInterval(async () => {
    try {
      const response = await axios.get<User[]>('http://localhost:3330/api/users');
      users.value = response.data;
    } catch (error) {
      console.error(error)
    }
  }, dbPollingInterval);
}

getUsers();

</script>

<template>
  <div class="h-[calc(100vh-50px)] bg-gray-200 p-[20px]">
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

      <div v-else>
        <div 
          v-for="user in users"
          :key="user.id" 
          class="bg-slate-200 grid gap-x-1 text-center user-grid border border-slate-400 my-1 py-1"
        >
          <p class="">{{ user.id.substring(0,9) + '...' }}</p>
          <p class="">{{ user.email }}</p>
          <p class="">{{ user.firstName }}</p>
          <p class="">{{ user.lastName }}</p>
          <p class="">{{ user.password ? true : false }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-grid {
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr;
}
</style>
