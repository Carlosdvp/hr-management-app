<template>
  <div class="h-[calc(100vh-50px)] bg-gray-50 p-[20px]">
    <div class="border border-gray-300 rounded-md p-[20px] h-full">
      <p v-if="users.length === 0">No users found</p>
      <p v-else v-for="user in users" :key="user.id">
        {{ user.firstName }}
        {{ user.lastName }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { User } from '@/types/User';

const users = ref<User[]>([]);

const getUsers = async (): Promise<void> => {
  try {
    const response = await axios.get<User[]>('http://localhost:3330/api/users');
    users.value = response.data;

    console.log(response.data);
  } catch (error) {
    console.error(error)
  }
}

getUsers();
</script>