<script setup lang="ts">

</script>

<template>
  <div class="bg-slate-400 h-full">
    <img src="./assets/icon.PNG" alt="icon" class="logo mx-auto my-0">

    <nav class="flex p-[16px] font-bold text-white">
      <router-link to="/">Home</router-link>
      <router-link class="pl-8" to="/dashboard">Dashboard</router-link>
    </nav>

    <router-view />
  </div>
</template>

<style scoped>
.logo {
  height: 11em;
  padding: 1.5em;
  border-radius: 100%;
}
</style>
