<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
</script>

<template>
  <img src="@/assets/icon.png" alt="icon" class="h-12 rounded-full mx-auto my-0">
  <Navbar />

  <div class="w-[100%] p-7 bg-slate-300 h-[100vh]">
    <label>Email</label>
    <input type="email">
    <label>Password</label>
    <input type="password">
  </div>
</template>
