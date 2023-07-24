<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Ref, ref } from 'vue';
import { useUserDataStore } from '@/store/users';

const router = useRouter();
const showDropDown: Ref<boolean> = ref(false);
const { clearLoggedInUser, loggedInUser } = useUserDataStore();

const toggleDrop = (): void => {
  showDropDown.value = !showDropDown.value;
}

const logout = async () => {
  const apiCall = await fetch('http://localhost:3330/api/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      session_token: localStorage.getItem('token')
    })
  }).then(apiCall => apiCall.json())

  if (apiCall.success) {
    localStorage.removeItem('token')
    clearLoggedInUser();

    router.push('/')
  } else {
    alert(apiCall.message)
  }
}
</script>

<template>
  <div class="w-[200px]">
    
    <div class="flex items-center justify-center space-x-4 pt-3" @click="toggleDrop">
      <svg aria-hidden="true" class="mr-2 w-[25px] h-[25px] fill-current" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path>
      </svg>
      <div>
        <p class="font-semibold">
          {{ loggedInUser?.firstName }} {{ loggedInUser?.lastName }}
        </p>
      </div>
    </div>

    <!-- Drop down -->
    <div v-show="showDropDown" class="absolute right-[10px] z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
      <div class="py-1 text-left" role="none">
        <router-link 
          to="/settings-page"
          class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">
          Account settings
        </router-link>
        <button
          @click="logout"
          type="submit"
          class="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem"
          tabindex="-1"
          >Sign out</button>
      </div>
    </div>

  </div>
</template>
