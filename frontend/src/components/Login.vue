<script setup lang="ts">
import { Ref, ref } from 'vue'

const email: Ref<string> = ref<string>('')
const password: Ref<string> = ref<string>('')
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
      @submit.prevent=""
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