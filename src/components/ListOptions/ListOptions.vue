<template>
  <div class="dropdown bg-white border rounded-md shadow-sm" role="listbox" tabindex="0">
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

<style scoped>
.dropdown::before {
  content: '';
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid white;
}
</style>
