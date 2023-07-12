<script setup lang="ts">

</script>

<template>
  <div class="bg-slate-400 h-full w-screen">
    <nav class="flex p-[16px] font-bold text-white">
      <router-link to="/">Home</router-link>
      <router-link class="pl-8" to="/dashboard">Dashboard</router-link>
      <router-link class="pl-8" to="/profile-page">Profile</router-link>
    </nav>

    <router-view />
  </div>
</template>
