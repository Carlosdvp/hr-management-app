<script setup lang="ts">
import { logout } from '@/utils/auth.utils'
import { Router } from 'vue-router';
import { useRouter } from 'vue-router';

const router: Router = useRouter();

const handleLogout = (): void => {
  logout(router);
}
</script>

<template>
  <button
    @click="handleLogout"
    class="border mx-2 border-white px-4 py-1 cursor-pointer font-semibold transition duration-200 ease-linear text-white hover:bg-white hover:text-black">
    Logout
  </button>
</template>
