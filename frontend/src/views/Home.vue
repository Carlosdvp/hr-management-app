<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import { useRouter } from 'vue-router';
import { useUserDataStore } from '@/store/users';

const router = useRouter();
const { loggedInUser } = useUserDataStore();

const redirectToLogin = () => {
  router.push('/login');
}

const redirectToRegister = () => {
  router.push('/register');
}
</script>

<template>
  <div class="flex w-full justify-between bg-slate-700">
    <Navbar />
    <div class="h-[50px] flex items-center px-16 z-10 text-white">
      <p class="font-semibold text-xl">
        {{ loggedInUser?.firstName }} {{ loggedInUser?.lastName }}
      </p>
    </div>
  </div>

  <div class="w-[100vw] bg-slate-600 h-[30%] text-center font-bold flex justify-center items-center">
    <button
      v-if="!loggedInUser"
      @click="redirectToLogin"
      class="border mx-2 border-white px-4 py-1 cursor-pointer font-semibold transition duration-200 ease-linear text-white hover:bg-white hover:text-black">
      Login
    </button>
    <button
      v-if="!loggedInUser"
      @click="redirectToRegister"
      class="border mx-2 border-white px-4 py-1 cursor-pointer font-semibold transition duration-200 ease-linear text-white hover:bg-white hover:text-black">
      Register
    </button>
    <!-- <button
      v-if="userLoggedIn"
      @click="logout"
      class="border mx-2 border-white px-4 py-1 cursor-pointer font-semibold transition duration-200 ease-linear text-white hover:bg-white hover:text-black">
      Logout
    </button> -->
  </div>
</template>
