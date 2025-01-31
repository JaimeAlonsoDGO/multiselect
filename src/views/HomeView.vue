<template>
  <section class="flex flex-col items-center justify-center h-screen bg-gray-200">
    <div class="w-[400px]">
      <MultiSelect v-model="itemsSelected" label="Chart type" :options="options" />
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import MultiSelect from '@/components/MultiSelect/MultiSelect.vue'

const itemsSelected = ref([])

const options = [
  {
    id: 1,
    name: 'Pie chart',
  },
  {
    id: 2,
    name: 'Bar chart',
  },
  {
    id: 3,
    name: 'Line chart',
  },
  {
    id: 4,
    name: 'Area chart',
  },
  {
    id: 5,
    name: 'Scatter chart',
  },
  {
    id: 6,
    name: 'Bubble chart',
  },
]
</script>
