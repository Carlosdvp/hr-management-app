<template>
  <div class="flex-col items-center pl-6">
    <h1>TypeScript Notes</h1>
    <div>
      Parent sent: {{ msg }}
    </div>
    <!-- {{ props.msg }} -->
    <p>{{ year }}</p>
    <p>{{ newYear }}</p>
    <p>{{ book.title }}</p>
    <p>{{ double }}</p>
    <input @keypress="handleChange" />
  </div>
</template>

<script setup lang="ts">
// Props with types
  defineProps<{ msg: string }>()
  // const props = defineProps<{ msg: string }>();

  // check this out, new feature
  // const { msg = 'Hey Demon Girl' } = defineProps<{ msg: string }>();

// ref and reactive and computed
import { computed, reactive, ref, type Ref } from 'vue';

const year = ref<number>(2077);
const newYear: Ref<string | number> = ref(1977);

const book = reactive({ title: "Necronomicon" })

const double = computed<number>(() => {
  return 2;
})

// Event Handlers
function handleChange(event: Event) {
  console.log((event.target as HTMLInputElement).value)
}
</script>