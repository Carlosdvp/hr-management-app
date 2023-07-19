<script setup lang="ts">
import { Ref, ref } from 'vue';

const showUserPanel: Ref<boolean> = ref(false);

const toggleUserPanel = (): void => {
  showUserPanel.value = !showUserPanel.value;
}
</script>

<template>
  <button class="flex items-center justify-center h-10 w-10 ml-6">
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      class="h-full w-full p-1" 
      viewBox="0 0 512 512">
      <circle cx="256" cy="256" r="256" fill="black" />
      <path 
        d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
        fill="skyblue" />
    </svg>
  </button> 
</template>
