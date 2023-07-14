<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
</script>

<template>
  <!-- <img src="@/assets/icon.png" alt="icon" class="h-12 rounded-full mx-auto my-0"> -->
  <Navbar />

  <div class="w-[100vw] p-7 bg-slate-300 h-[100vh] text-center font-bold">
    <router-link to="/login" class="p-4 hover:text-teal-600">Login</router-link>
    <router-link to="/register" class="p-4 hover:text-teal-600">Register</router-link>
  </div>

</template>
