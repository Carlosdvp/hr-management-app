<script setup lang="ts">

</script>

<template>
  <main 
    class="w-[70vw] h-[60vh] mx-auto my-0 bg-slate-500 text-white">
    <header
      class="p-8">
      <h1
        class="text-xl p-4 my-4 border border-white font-bold">
        HR Management App
      </h1>
      <h2
        class="text-3xl py-4 mb-4">
        Reset Password
      </h2>
    </header>

    <form
      @submit.prevent=""
      class="w-[80%] h-[45%] mx-auto my-0 bg-slate-300 text-black py-16 px-6 text-center">
      <label class="mb-6">
        <span class="block text-base font-medium mb-4">Enter your email</span>
        <input
          type="email"
          name="email" 
          
          placeholder="email@test.com"
          class="h-[2rem] p-2 border border-blue-400 focus:outline-none focus:border-red-800 focus:ring-red-800" />
      </label>
    </form>
  </main>
</template>
