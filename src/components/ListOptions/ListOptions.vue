<template>
  <div class="bg-white border rounded-md shadow-sm" tabindex="0">
    <OptionList
      v-for="option in options"
      :key="option[keyField]?.toString()"
      v-bind="option"
      @click="selectOption(option)"
    >
      <slot v-bind="{ option }"></slot>
    </OptionList>
  </div>
</template>

<script setup lang="ts">
import OptionList from '../OptionList/OptionList.vue'

import type { LisOptionsProps } from './types'
import type { OptionListProps } from '../OptionList/types'

withDefaults(defineProps<LisOptionsProps>(), {
  options: () => [],
  keyField: 'id',
  labelField: 'name',
})

const emit = defineEmits(['select'])

const selectOption = (option: OptionListProps) => {
  emit('select', option)
}
</script>
