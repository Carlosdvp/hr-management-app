<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import UserMenuDropdown from '@/components/UserMenuDropdown.vue';
import { Ref, ref } from 'vue';
import { useUserDataStore } from '@/store/users';

const { loggedInUser, setLoggedInUser } = useUserDataStore();

const email: Ref<string> = ref<string>('');
const password: Ref<string> = ref<string>('');
const newEmail: Ref<string> = ref<string>('');

email.value = loggedInUser?.email ?? '';

const updateSettings = async () => {
  const updateData: { email?: string; password?: string} = {};

  if (newEmail.value) {
    updateData.email = newEmail.value;
  }

  if (password.value) {
    updateData.password = password.value;
  }

  const updateResult = await fetch(`http://localhost:3330/api/users/${email.value}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData)
  }).then((response) => response.json());

  if (updateResult.success) {
    setLoggedInUser(updateResult.user)

    alert('Account settings updated successfully');
  } else {
    alert(updateResult.message);
  }
}
</script>

<template>
  <div class="flex w-full justify-between bg-slate-700">
    <Navbar />
    <div class="border-b-white">
      <UserMenuDropdown class="h-[50px] flex items-center py-[10px] z-10 text-white" />
    </div>
  </div>

  <main 
    class="w-[70vw] h-[80vh] mx-auto my-0 pb-16 bg-slate-500 flex flex-col items-start justify-start text-white">
    <header class="p-8">
      <h1 class="text-xl p-4 my-4 border border-white font-bold">HR Management App</h1>
      <h2 class="text-3xl py-4 mb-4">Settings</h2>
      <p class="font-medium">Update your account settings.</p>
    </header>

    <form 
      @submit.prevent="updateSettings"
      name="settingsForm"
      class="flex-1 block w-[80%] mx-auto my-0 bg-slate-300 text-black py-16 px-6 text-center">
      <label class="block mb-6">
        <span class="block text-base font-medium mb-4">Current Password</span>
        <input
          type="password"
          v-model="password"
          class="h-[2rem] p-2 border border-blue-400 focus:outline-none focus:border-red-800 focus:ring-red-800"
        />
      </label>
      <label class="block mb-6">
        <span class="block text-base font-medium mb-4">Email</span>
        <input
          type="email"
          name="newEmail"
          v-model="newEmail"
          class="h-[2rem] p-2 border border-blue-400 focus:outline-none focus:border-red-800 focus:ring-red-800"
        />
      </label>
      <label class="block mb-6">
        <span class="block text-base font-medium mb-4">Password</span>
        <input
          type="password"
          name="password"
          class="h-[2rem] p-2 border border-blue-400 focus:outline-none focus:border-red-800 focus:ring-red-800"
        />
      </label>
      <input
        type="submit"
        value="Update"
        class="border border-white px-4 py-1 cursor-pointer font-bold transition duration-200 ease-linear hover:bg-white"
      />
    </form>
  </main>
</template>