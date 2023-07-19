<script setup lang="ts">
import { Ref, ref } from 'vue';
import router from '@/router';

const firstName: Ref<string> = ref<string>('')
const lastName: Ref<string> = ref<string>('')
const email: Ref<string> = ref<string>('')
const password: Ref<string> = ref<string>('')
const showUserPanel: Ref<boolean> = ref(false);

const toggleUserPanel = (): void => {
  showUserPanel.value = !showUserPanel.value;
}

const registerNewUser = async () => {
  const sendUserData = await fetch('http://localhost:3330/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value
    })
  }).then(sendUserData => sendUserData.json())

  if (sendUserData.success) {
    localStorage.setItem('token', sendUserData.token)
    router.push('/')
  } else {
    alert(sendUserData.message);
  }
}
</script>

<template>
  <button 
    class="flex items-center justify-center h-10 w-10 ml-6"
    @click="toggleUserPanel"
    v-if="!showUserPanel">
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      class="h-full w-full p-1" 
      viewBox="0 0 512 512">
      <circle cx="256" cy="256" r="256" fill="black" />
      <path 
        d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
        fill="skyblue" />
    </svg>
  </button> 

  <main 
    class="max-w-lg w-[200px] h-full bg-slate-600 text-white z-20" 
    :class="{ 'hidden': !showUserPanel }">
    <div class="h-[50px] bg-slate-800 flex items-center justify-center">
      <h3 class="font-bold text-xl">Add a New User</h3>
    </div>
    <div>
      <form
       
        class="flex-1 block mx-auto my-0 bg-slate-600 text-black py-6 px-6 text-center">
        <label class="block mb-6">
          <span class="block text-base font-medium mb-4 text-white">Enter a first name</span>
          <input
            type="text"
            name="firstName" 
            v-model="firstName"
            placeholder="Name"
            class="h-[2rem] p-2 border border-blue-400 focus:outline-none focus:border-red-800 focus:ring-red-800" />
        </label>
        <label class="block mb-6">
          <span class="block text-base font-medium mb-4 text-white">Enter a last name</span>
          <input
            type="text"
            name="lastName" 
            v-model="lastName"
            placeholder="Lastname"
            class="h-[2rem] p-2 border border-blue-400 focus:outline-none focus:border-red-800 focus:ring-red-800" />
        </label>
        <label class="block mb-6">
          <span class="block text-base font-medium mb-4 text-white">Enter an email</span>
          <input
            type="email"
            name="email" 
            v-model="email"
            placeholder="email@test.com"
            class="h-[2rem] p-2 border border-blue-400 focus:outline-none focus:border-red-800 focus:ring-red-800" />
        </label>
        <label class="block mb-6">
          <span class="block text-base font-medium mb-4 text-white">Enter a password</span>
          <input
            type="password"
            name="password" 
            v-model="password"
            placeholder="******"
            class="h-[2rem] p-2 border border-blue-400 focus:outline-none focus:border-red-800 focus:ring-red-800" />
        </label>
        <input
          type="submit"
          value="Add User"
          @click="registerNewUser"
          class="w-[80%] border border-white px-4 py-1 cursor-pointer font-semibold transition duration-200 ease-linear text-white hover:bg-white hover:text-black" />
        <input
          type="submit"
          value="Exit"
          @click="toggleUserPanel"
          class="w-[80%] border border-white px-4 py-1 mt-4 cursor-pointer font-semibold transition duration-200 ease-linear text-white hover:bg-white hover:text-black" />
      </form>
    </div>
    
  </main>
</template>