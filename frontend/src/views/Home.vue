<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const redirectToLogin = () => {
  router.push('/login');
}
const redirectToRegister = () => {
  router.push('/register');
}
</script>

<template>
  <Navbar />
  <div class="w-[100vw] bg-slate-600 h-[30%] text-center font-bold flex justify-center items-center">
    <button
      @click="redirectToLogin"
      class="border mx-2 border-white px-4 py-1 cursor-pointer font-semibold transition duration-200 ease-linear text-white hover:bg-white hover:text-black">
      Login
    </button>
    <button
      @click="redirectToRegister"
      class="border mx-2 border-white px-4 py-1 cursor-pointer font-semibold transition duration-200 ease-linear text-white hover:bg-white hover:text-black">
      Register
    </button>
  </div>
</template>
