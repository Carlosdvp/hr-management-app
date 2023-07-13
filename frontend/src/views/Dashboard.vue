<template>
  <div class="flex w-screen h-screen">
    <Sidebar />

    <div class="w-full h-full">
      <div
        class="h-[50px] bg-gray-100 flex items-center shadow-sm px-[20px] w-full py-[10px] z-10 border-b"
      >
        <SearchBar />
        <UserMenuDropdown />
      </div>

      <UserTable />
    </div>
  </div>
</template>

<script setup lang="ts">
import UserMenuDropdown from '@/components/UserMenuDropdown.vue'
import UserTable from '@/components/UserTable.vue'
import SearchBar from '@/components/SearchBar.vue'
import Sidebar from '@/components/Sidebar.vue'
</script>
