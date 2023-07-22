<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import { useUserDataStore } from '@/store/users';
import { computed } from 'vue';

const { loggedInUser } = useUserDataStore();

// Create a computed property to get and set the first name
const firstName = computed({
  get: () => loggedInUser?.firstName ?? '',
  set: (value) => {
    if (loggedInUser) {
      loggedInUser.firstName = value;
    }
  },
});

const lastName = computed({
  get: () => loggedInUser?.lastName ?? '',
  set: (value) => {
    if (loggedInUser) {
      loggedInUser.lastName = value;
    }
  },
});

const email = computed({
  get: () => loggedInUser?.email ?? '',
  set: (value) => {
    if (loggedInUser) {
      loggedInUser.email = value;
    }
  },
});

// Function to update the first name when the input changes
const updateFirstName = (event: InputEvent) => {
  const newValue = (event.target as HTMLInputElement).value;
  firstName.value = newValue;
};
const updateLastName = (event: InputEvent) => {
  const newValue = (event.target as HTMLInputElement).value;
  lastName.value = newValue;
};
const updateEmail = (event: InputEvent) => {
  const newValue = (event.target as HTMLInputElement).value;
  email.value = newValue;
};

</script>

<template>
  <Navbar />

  <div 
    class="w-full py-2 bg-slate-500 h-[100vh] flex flex-col items-center">
    
    <header class="flex justify-between bg-slate-400 w-[95%] text-white">
      <div class="flex items-center">
        <!-- img icon  for the user showing a pisture or their initials -->
        <img src="" alt="icon" class="bg-blue-400 w-10 mx-4 rounded-full">
        <div>
          <h1 class="px-3 py-1 font-semibold text-lg">
            {{ loggedInUser?.firstName }} {{ loggedInUser?.lastName }}
          </h1>
          <p class="text-sm text-gray-600 pb-2">Full Stack Developer</p>
        </div>
      </div>
      <div class="flex items-center">
        <a 
          class="text-md mx-4 hover:text-blue-800" 
          href="mailto:username@gmail.com">
          {{ loggedInUser?.email }}</a>
        <p class="text-sm mx-4">591-123-45678</p>
        <p class="text-sm mx-4">Created: {{ loggedInUser?.createdAt }}</p>
        <p class="text-sm mx-4">Last Modified: Feb 21 3:25 PM</p>
      </div>
    </header>

    <main class="grid grid-cols-1 gap-2 p-8 mt-8 w-[80%] max-w-6xl bg-slate-300">
      <div class="grid grid-cols-2 gap-4 bg-slate-100 p-4">
        <!-- First column -->
        <div class="px-4">
          <div class="mb-4 flex justify-between">
            <label class="mr-2 text-gray-600 p-1">User ID:</label>
            <input
              type="text"
              :value="loggedInUser?.id"
              class="w-[70%] bg-gray-100 mx-2 p-1 text-slate-400 rounded" 
              readonly />
          </div>

          <div class="mb-4 flex justify-between">
            <label class="block text-gray-600 p-1">First Name:</label>
            <input
              type="text"
              :value="firstName"
              @input="updateFirstName($event as InputEvent)"
              class="w-[70%] border border-gray-300 mx-2 p-1 rounded" />
          </div>

          <div class="mb-4 flex justify-between">
            <label class="block text-gray-600 p-1">Last Name:</label>
            <input
              type="text"
              :value="lastName"
              @input="updateLastName($event as InputEvent)"
              class="w-[70%] border border-gray-300 mx-2 p-1 rounded" />
          </div>
        </div>

        <!-- Second column -->
        <div class="px-4">
          <div class="mb-4 flex justify-between">
            <label class="block text-gray-600 p-1">Email:</label>
            <input
              type="email"
              :value="email"
              @input="updateEmail($event as InputEvent)"
              class="w-[80%] border border-gray-300 mx-2 py-1 rounded" />
          </div>

          <div class="mb-4 flex justify-between">
            <label class="block text-gray-600 p-1">Mobile:</label>
            <input type="tel" class="w-[80%] border border-gray-300 mx-2 py-1 rounded" />
          </div>

          <div class="mb-4 flex justify-between">
            <label class="block text-gray-600 p-1">Country:</label>
            <select class="w-[80%] border border-gray-300 mx-2 p-1 text-slate-500 rounded">
              <option value="">Select a Country</option>
              <option value="1">USA</option>
              <option value="2">Russia</option>
              <option value="3">Portugal</option>
              <option value="4">Sweden</option>
              <option value="1">Hungary</option>
              <option value="2">Italy</option>
              <option value="3">Poland</option>
              <option value="4">Serbia</option>
            </select>
          </div>

          <div class="mb-4 flex justify-between">
            <label class="block text-gray-600 p-1">City:</label>
            <input type="text" class="w-[80%] border border-gray-300 mx-2 py-1 rounded" />
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 bg-slate-100 p-4">
        <!-- First column -->
        <div class="w-[80%] mx-auto my-0">
          <div class="mb-4 flex justify-between">
            <label class="mr-2 text-gray-600 p-1">Developer Type:</label>
            <select class="w-[60%] border border-gray-300 px-2 p-1 text-slate-500 rounded">
              <option value="">Select a developer type</option>
              <option value="1">Frontend</option>
              <option value="2">Backend</option>
              <option value="3">Full stack</option>
            </select>
          </div>

          <div class="mb-4 flex justify-between">
            <label class="block text-gray-600 p-1">Main Tech Stack:</label>
            <textarea class="w-[70%] h-32 border border-gray-300 px-2 p-1 text-slate-500 rounded"></textarea>
          </div>
        </div>

        <!-- Second column -->
        <div class="w-[80%] mx-auto my-0">
          <div class="mb-4 flex justify-between">
            <label class="text-gray-600 p-1">Years of Experience:</label>
            <select class="w-[50%] border border-gray-300 px-2 p-1 text-slate-500 rounded">
              <option value="">Number of years</option>
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
            <label class="mr-2 text-gray-600 p-1">English Level:</label>
            <select class="w-[50%] border border-gray-300 px-2 p-1 text-slate-500 rounded">
              <option value="">Select English level</option>
              <option value="basic">Basic</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="fluent">Fluent</option>
            </select>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 bg-slate-100 p-4">
        <!-- First column -->
        <div class="w-[80%] mx-auto my-0">
          <div class="mb-4 flex justify-between">
            <label class="block text-gray-600 p-1">Candidate Status:</label>
            <select class="w-[60%] border border-gray-300 px-2 py-1 rounded text-slate-500">
              <option value="">Select candidate status</option>
              <option value="Interview">Interview</option>
              <option value="Tech Interview">Tech Interview</option>
              <option value="Pending">Pending</option>
              <option value="Hired">Hired</option>
            </select>
          </div>

          <div class="mb-4 flex justify-between">
            <label class="block text-gray-600 p-1">Recruiter:</label>
            <input type="text" class="w-[60%] border border-gray-300 px-2 py-1 rounded" />
          </div>

          <div class="mb-4 flex justify-between">
            <label class="block text-gray-600 p-1">Source:</label>
            <select class="w-[60%] border border-gray-300 px-2 py-1 rounded text-slate-500">
              <option value="">Select source</option>
              <option value="Internet">Internet</option>
              <option value="Job Site">Job Site</option>
              <option value="Referral">Referral</option>
              <option value="Walk-in">Walk-in</option>
            </select>
          </div>
        </div>

        <!-- Second column -->
        <div class="w-[80%] mx-auto my-0">
          <div class="mb-4 flex justify-between">
            <label class="block text-gray-600 p-1">Availability:</label>
            <select class="w-[50%] border border-gray-300 mx-2 p-1 rounded text-slate-500">
              <option value="">Select availability</option>
              <option value="Immediately">Immediately</option>
              <option value="1 week">1 week</option>
              <option value="2 weeks">2 weeks</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div class="mb-4 flex justify-between">
            <label class="block text-gray-600 p-1">Salary Expectation:</label>
            <input type="text" class="w-[50%] border border-gray-300 mx-2 p-1 rounded text-slate-500" />
          </div>

          <div class="mb-4 flex justify-between">
            <label class="block text-gray-600 p-1">Referred by:</label>
            <input type="text" class="w-[50%] border border-gray-300 mx-2 p-1 rounded" />
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 bg-slate-100 p-4">
        <div class="w-[80%] mx-auto my-0">
          <div class="mb-4 flex justify-between">
            <label class="block text-gray-600 p-1">Github:</label>
            <input type="text" class="w-[60%] border border-gray-300 mx-2 p-1 rounded" />
          </div>

          <div class="mb-4 flex justify-between">
            <label class="block text-gray-600 p-1">LinkedIn:</label>
            <input type="text" class="w-[60%] border border-gray-300 mx-2 p-1 rounded" />
          </div>
        </div>

        <div class="w-[80%] mx-auto my-0">
          <div class="mb-4 flex justify-between">
            <label class="block text-gray-600 p-1">Personal Website:</label>
            <input type="text" class="w-[60%] border border-gray-300 mx-2 p-1 rounded" />
          </div>
        </div>
      </div>

    </main>
  </div>
</template>
