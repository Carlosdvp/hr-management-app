<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
</script>

<template>
  <Navbar />

  <div 
    class="w-[100vw] py-2 bg-slate-300 h-[100vh] flex flex-col items-center">
    
    <header class="flex bg-yellow-400 w-full border border-y-red-500">
      <!-- img icon  for the user showing a pisture or their initials -->
      <img src="" alt="icon" class="bg-blue-400 w-10 m-2">
      <h1 class="p-3 font-semibold text-lg">username</h1>
    </header>

    <main class="grid grid-cols-1 gap-2 pt-4 w-[90%] max-w-6xl">
      <div class="grid grid-cols-2 gap-4 bg-white p-4">
        <!-- First column -->
        <div class="px-4">
          <div class="mb-4 flex justify-between">
            <label class="mr-2 text-gray-600">User ID:</label>
            <input type="text" value="12345" class="w-[70%] bg-gray-100 mx-2 p-1 text-slate-400 rounded" readonly />
          </div>

          <div class="mb-4 flex justify-between">
            <label class="block text-gray-600">First Name:</label>
            <input type="text" class="w-[70%] border border-gray-300 mx-2 py-1 rounded" />
          </div>

          <div class="mb-4 flex justify-between">
            <label class="block text-gray-600">Last Name:</label>
            <input type="text" class="w-[70%] border border-gray-300 mx-2 py-1 rounded" />
          </div>
        </div>

        <!-- Second column -->
        <div class="px-4">
          <div class="mb-4 flex justify-between">
            <label class="block text-gray-600">Email:</label>
            <input type="email" class="w-[80%] border border-gray-300 mx-2 py-1 rounded" />
          </div>

          <div class="mb-4 flex justify-between">
            <label class="block text-gray-600">Mobile:</label>
            <input type="tel" class="w-[80%] border border-gray-300 mx-2 py-1 rounded" />
          </div>

          <div class="mb-4 flex justify-between">
            <label class="block text-gray-600">Country:</label>
            <select class="w-[80%] border border-gray-300 mx-2 p-1 text-slate-500 rounded">
              <option value="">Select a Country</option>
              <!-- Add your list of countries here as <option> elements -->
            </select>
          </div>

          <div class="mb-4 flex justify-between">
            <label class="block text-gray-600">City:</label>
            <input type="text" class="w-[80%] border border-gray-300 mx-2 py-1 rounded" />
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 bg-white p-4">
        <!-- First column -->
        <div class="w-[80%] mx-auto my-0">
          <div class="mb-4 flex justify-between">
            <label class="mr-2 text-gray-600">Developer Type:</label>
            <select class="w-[60%] border border-gray-300 px-2 p-1 text-slate-500 rounded">
              <option value="">Select a developer type</option>
              <!-- Add your list of options here as <option> elements -->
            </select>
          </div>

          <div class="mb-4 flex justify-between">
            <label class="block text-gray-600">Main Tech Stack:</label>
            <textarea class="w-[70%] h-32 border border-gray-300 px-2 p-1 text-slate-500 rounded"></textarea>
          </div>
        </div>

        <!-- Second column -->
        <div class="w-[80%] mx-auto my-0">
          <div class="mb-4 flex justify-between">
            <label class="mr-2 text-gray-600">Years of Experience:</label>
            <select class="w-[60%] border border-gray-300 px-2 p-1 text-slate-500 rounded">
              <option value="">Select years of experience</option>
              <option value="1">1 year</option>
              <option value="2">2 years</option>
              <option value="3">3 years</option>
              <option value="4">4 years</option>
              <option value="5">5 years</option>
              <option value="6">6 years</option>
              <option value="7">7 years</option>
              <option value="8">8 years</option>
            </select>
          </div>

          <div class="mb-4 flex justify-between">
            <label class="mr-2 text-gray-600">English Level:</label>
            <select class="w-[60%] border border-gray-300 px-2 p-1 text-slate-500 rounded">
              <option value="">Select English level</option>
              <option value="basic">Basic</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="fluent">Fluent</option>
            </select>
          </div>

          <div class="flex items-center">
            <!-- Empty space (placeholder) -->
          </div>

          <div class="flex items-center">
            <!-- Empty space (placeholder) -->
          </div>
        </div>
      </div>

      <div class="grid grid-rows-3 bg-white p-4">

      </div>
      <div class="grid grid-rows-2 bg-white p-4">

      </div>
    </main>
  </div>
</template>
