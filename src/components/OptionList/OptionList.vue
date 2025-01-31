<template>
  <div
    class="flex items-center justify-between gap-2 py-2 px-5 rounded-md"
    :class="{
      'bg-gray-100 font-semibold': selected,
      'cursor-pointer hover:bg-gray-100 hover:font-semibold': !disabled,
      'cursor-not-allowed bg-gray-200 text-gray-400': disabled,
    }"
    tabindex="0"
    @click="select"
  >
    <slot>
      <span>{{ name }}</span>
    </slot>
  </div>
</template>

<script setup lang="ts">
import type { OptionListProps } from './types'

const props = defineProps<OptionListProps>()

const emit = defineEmits(['click'])

const select = () => {
  if (props.disabled) return
  emit('click', { id: props.id, name: props.name })
}
</script>
