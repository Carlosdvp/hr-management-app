<script setup lang="ts">
import { Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserDataStore } from '@/store/users'

const router = useRouter();
const { fetchUsers, setLoggedInUser }  = useUserDataStore();

const email: Ref<string> = ref<string>('')
const password: Ref<string> = ref<string>('')
const errorMessage: Ref<string> = ref<string>('')

const userLogin = async () => {
  if (!email.value || !password.value) {
    return alert('Please enter username and password');
  }

  await fetchUsers();

  const sendUserData = await fetch('http://localhost:3330/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  }).then(sendUserData => sendUserData.json())

  console.log('Login', sendUserData)

  if (sendUserData.success) {
    localStorage.setItem('token', sendUserData.token);
    setLoggedInUser(sendUserData.user);
    router.push('/dashboard')
  } else {
    console.log(sendUserData.message);
    errorMessage.value = sendUserData.message;    
  }
}

</script>

<template>
  <main 
    class="w-[70vw] h-[100vh] mx-auto my-0 bg-slate-500 flex flex-col items-start justify-start text-white">
    <header
      class="p-8">
      <h1
        class="text-xl p-4 my-4 border border-white font-bold">
        HR Management App
      </h1>
      <h2
        class="text-3xl py-4 mb-4">
        Login
      </h2>
      <p
        class="font-medium">
        Login or create an account.
      </p>
    </header>

    <form
      @submit.prevent="userLogin"
      class="flex-1 block w-[80%] mx-auto my-0 bg-slate-300 text-black py-16 px-6 text-center">
      <label class="block mb-6">
        <span class="block text-base font-medium mb-4">Enter your email</span>
        <input
          type="email"
          name="email" 
          v-model="email"
          placeholder="email@test.com"
          class="h-[2rem] p-2 border border-blue-400 focus:outline-none focus:border-red-800 focus:ring-red-800" />
      </label>
      <label class="block mb-6">
        <span class="block text-base font-medium mb-4">Enter your password</span>
        <input
          type="password"
          name="password" 
          v-model="password"
          placeholder="******"
          class="h-[2rem] p-2 border border-blue-400 focus:outline-none focus:border-red-800 focus:ring-red-800" />
      </label>
      <input
        type="submit"
        value="Login"
        class="border border-white px-4 py-1 cursor-pointer font-bold transition duration-200 ease-linear hover:bg-white" />
      <p class="p-8 pb-12 mt-4">Forgot your password? 
        <router-link
          to="/forgot-password"
          class="font-bold text-blue-500 hover:underline">
          Reset here
        </router-link>
      </p>
      <div 
        v-if="errorMessage"
        class="bg-red-100 text-red-600 p-4">
        <p>
          {{ errorMessage }}
        </p>
      </div>
    </form>

    <footer
      class="bg-slate-100 w-[100%] text-center p-8 pb-12 mt-4 text-slate-900">
      <p>Don't have an account? 
        <router-link
          to="/register"
          class="font-bold text-blue-500 hover:underline"
          >Register here</router-link>
      </p>
    </footer>
  </main>
</template>
