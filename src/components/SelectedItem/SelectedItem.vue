<template>
  <div
    class="bg-gray-200 hover:bg-gray-300 rounded-md px-2 py-1 flex items-center justify-between gap-2 cursor-default select-none w-fit"
  >
    {{ label }}
    <button class="cursor-pointer" @click="removeOption()">✕</button>
  </div>
</template>

<script setup lang="ts">
import { SelectedItemProps } from './types'

const props = defineProps<SelectedItemProps>()

const emit = defineEmits(['remove'])

const removeOption = () => {
  emit('remove', props.label)
}
</script>
