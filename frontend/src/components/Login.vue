<script setup lang="ts">
import { Ref, ref } from 'vue';

const email: Ref<string> = ref<string>('');
const password: Ref<string> = ref<string>('')
</script>

<template>
  <main class="w-[100vw] p-7 bg-slate-300 h-[100vh]">
    <header>
      <h1>HR Management App</h1>
      <h2>Login</h2>
      <p>Login or create an account.</p>
    </header>

    <form @submit.prevent="">
      <label>
        <span>Enter your email</span>
        <input
          type="email"
          name="email" 
          v-model="email"
          placeholder="email@test.com" />
      </label>
      <label>
        <span>Enter your password</span>
        <input
          type="password"
          name="password" 
          v-model="password"
          placeholder="******" />
      </label>
      <input type="submit" value="login" />
    </form>

    <footer>
      <p>Don't have an account? <router-link to="/register">Register</router-link></p>
    </footer>
  </main>
</template>
