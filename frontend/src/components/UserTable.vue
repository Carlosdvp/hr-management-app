<script setup lang="ts">
import { Ref, computed, ref } from 'vue';
import { User } from '@/types/User';
import { useUserDataStore } from '@/store/users';
import SearchBar from './SearchBar.vue';
import AddUser from './AddUser.vue';

const { clearDeletedUser, fetchUsers } = useUserDataStore();

const headerItems: Ref<string[]> = ref<string[]>(['', 'Id', 'Email', 'First Name', 'Last Name']);
const users: Ref<User[]> = ref<User[]>([]);
const searchText: Ref<string> = ref('');
const userDeleteMessage: Ref<string> = ref<string>('')

const getUsers = async (): Promise<void> => {
  users.value = await fetchUsers();

  const dbPollingInterval = 60 *60 *1000; // 1 hour
  setInterval(async () => {
    users.value = await fetchUsers();
  }, dbPollingInterval);
}

const deleteUser = async () => {
  const selectedUsers = users.value.filter((user) => user.isSelected);
  if (selectedUsers.length === 0) {
    setUserDeleteMessage('No users selected for deletion, select one or more users to delete.');
    
    return;
  }

  for (let user of selectedUsers) {
    const result = await fetch(`http://localhost:3330/api/users/${user.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => response.json());

    if (user) {
      const message = `User: ${result.deletedUser.id}, deleted successfully`;
      setUserDeleteMessage(message);

      console.log(`User: ${result.deletedUser.id}, deleted successfully`);
      clearDeletedUser(user);
      await getUsers();
    } else {
      console.log(selectedUsers);
      setUserDeleteMessage('Failed to delete user');
    }
  }
}

const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    const searchTerm = searchText.value.toLowerCase();
    
    return (
      user.firstName.toLowerCase().includes(searchTerm) ||
      user.lastName.toLowerCase().includes(searchTerm)
    );
  })
})

const setUserDeleteMessage = (message: string) => {
  userDeleteMessage.value = message;

  setTimeout(() => {
    userDeleteMessage.value = '';
  }, 5000);
}

getUsers();

</script>

<template>
  <div class="h-[calc(100vh-50px)] max-w-[1080px] w-full mx-auto my-0 bg-gray-200 p-[20px]">
    <div class="h-[60px] flex shadow-sm px-7 pb-5 items-center justify-end">
      <SearchBar
        :modelValue="searchText" @update:modelValue="searchText = $event" />

      <AddUser @user-registered="getUsers"  />
    </div>

    <div class="border-2 border-white p-[20px]">
      <header
        class="grid user-grid col-span-full gap-1 h-[5vh] items-center justify-between bg-slate-300"
      >
        <p 
          v-for="(headerItem, index) in headerItems"
          :key="index"
          class="font-bold p-2 text-center sm:text-sm md:text-base"
        >
          {{ headerItem }}
        </p>
      </header>

      <p v-if="users.length === 0">No users found</p>

      <div v-else class="pb-4">
        <div 
          v-for="user in filteredUsers"
          :key="user.id" 
          class="bg-slate-200 grid gap-x-1 text-center user-grid border border-slate-400 my-1 py-1 sm:text-xs md:text-sm">
          <input
            class="w-12"
            type="checkbox"
            v-model="user.isSelected" />
          <p class="">{{ user.id.substring(0,9) + '...' }}</p>
          <p class="">{{ user.email }}</p>
          <p class="">{{ user.firstName }}</p>
          <p class="">{{ user.lastName }}</p>
        </div>
      </div>
      <button
        class="bg-slate-500 text-white font-semibold p-2 border border-slate-900 transsition duration-200 ease-linear hover:bg-white hover:text-black cursor-pointer"
        @click="deleteUser">Delete Selected Users</button>
      <div 
        v-if="userDeleteMessage"
        :class="{'fade-out': userDeleteMessage}"
        class="bg-red-100 text-red-600 p-4">
        <p>
          {{ userDeleteMessage }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/style.css';

.user-grid {
  grid-template-columns: 2rem repeat(4, 1fr);
}
</style>
