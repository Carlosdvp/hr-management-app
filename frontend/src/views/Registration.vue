<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import { Ref, ref } from 'vue'

const firstName: Ref<string> = ref<string>('')
const lastName: Ref<string> = ref<string>('')
const email: Ref<string> = ref<string>('')
const password: Ref<string> = ref<string>('')
const confirmPassword: Ref<string> = ref<string>('')
</script>

<template>
  <Navbar />
  <main 
    class="w-[70vw] h-[90vh] mx-auto my-0 mt-4 bg-slate-500 flex flex-col items-start justify-start text-white">
    <header
      class="p-8">
      <h1
        class="text-xl p-4 my-4 border border-white font-bold">
        HR Management App
      </h1>
      <h2
        class="text-3xl py-4 mb-4">
        Register
      </h2>
      <p
        class="font-medium">
        Create an account.
      </p>
    </header>

    <form
      @submit.prevent=""
      class="flex-1 block w-[80%] mx-auto my-0 bg-slate-300 text-black py-16 px-6 text-center">
      <label class="block mb-6">
        <span class="block text-base font-medium mb-4">Enter your first name</span>
        <input
          type="text"
          name="firstName" 
          v-model="firstName"
          placeholder="Fulanito"
          class="h-[2rem] p-2 border border-blue-400 focus:outline-none focus:border-red-800 focus:ring-red-800" />
      </label>
      <label class="block mb-6">
        <span class="block text-base font-medium mb-4">Enter your last name</span>
        <input
          type="text"
          name="lastName" 
          v-model="lastName"
          placeholder="de Tal"
          class="h-[2rem] p-2 border border-blue-400 focus:outline-none focus:border-red-800 focus:ring-red-800" />
      </label>
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
      <label class="block mb-6">
        <span class="block text-base font-medium mb-4">Confirm your password</span>
        <input
          type="password"
          name="password" 
          v-model="confirmPassword"
          placeholder="******"
          class="h-[2rem] p-2 border border-blue-400 focus:outline-none focus:border-red-800 focus:ring-red-800" />
      </label>
      <input
        type="submit"
        value="Register"
        class="border border-white px-4 py-1 cursor-pointer font-semibold transition duration-200 ease-linear hover:bg-white" />
    </form>

    <footer
      class="bg-slate-100 w-[100%] text-center p-8 pb-12 mt-4 text-slate-900">
      <p>Already have an account? 
        <router-link
          to="/login"
          class="font-semibold text-blue-500 hover:underline"
          >Login here</router-link>
      </p>
    </footer>
  </main>
</template>
