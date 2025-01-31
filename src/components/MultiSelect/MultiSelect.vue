<template>
  <div ref="multiSelectRef" class="relative w-full">
    <slot>
      <label class="text-gray-700 text-[14px]">
        {{ label }}
      </label>
    </slot>
    <div
      class="flex flex-wrap items-center gap-2 border bg-white rounded-md p-2 active:border-blue-500 focus:border-blue-500"
      :class="{ 'border-2 border-blue-500': showDropdown }"
      role="combobox"
      :aria-expanded="showDropdown"
      :aria-controls="dropdownListId"
      tabindex="0"
    >
      <SelectedItem
        v-for="option in selectedOptions"
        :key="option[keyField].toString()"
        :id="+option[keyField]"
        :name="option[labelField].toString()"
        @remove="removeOption"
      />
      <input
        type="text"
        v-model="searchTerm"
        @focus="showDropdown = true"
        placeholder="Search"
        class="flex-1 p-1 outline-none"
      />
    </div>

    <ListOptions
      v-if="showDropdown"
      :id="dropdownListId"
      class="absolute z-10 top-full mt-2 w-full min-h-10"
      :options="filteredOptions"
      @select="selectOption"
    >
      <template #default="{ option }">
        <span
          v-html="
            underlineMatch(option[labelField].toString(), searchTerm, isNewOption(option, keyField))
          "
        ></span>
        <span v-if="isNewOption(option, keyField)" class="hover:font-normal font-normal">
          (new item)
        </span>
      </template>
    </ListOptions>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted, useTemplateRef } from 'vue'

import ListOptions from '@/components/ListOptions/ListOptions.vue'
import SelectedItem from '@/components/SelectedItem/SelectedItem.vue'

import type { MultiSelectProps } from './types'

import { useSelection } from '@/composables/useSelection'
import { useSearch } from '@/composables/useSearch'

import { underlineMatch } from '@/utils/text'
import { isNewOption } from '@/utils/options'
import { uniqueRandomId } from '@/utils/random'

const props = withDefaults(defineProps<MultiSelectProps>(), {
  options: () => [],
  modelValue: () => [],
  keyField: 'id',
  labelField: 'name',
  label: 'Select items',
})

const dropdownListId = uniqueRandomId('dropdown-list')
const showDropdown = ref(false)
const multiSelectRef = useTemplateRef('multiSelectRef')

const emit = defineEmits(['update:modelValue'])

const { selectedOptions, selectOption, removeOption, alreadySelected } = useSelection(
  props.keyField,
  props.modelValue,
  emit,
)

const { searchTerm, filteredOptions } = useSearch(props.options, props.labelField, alreadySelected)

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
  document.removeEventListener('click', closeDropdown)
})

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.ctrlKey && event.key === 'a') {
    event.preventDefault()
    const allSelected = selectedOptions.value.length === props.options.length
    emit('update:modelValue', allSelected ? [] : [...props.options])
  }
}

const closeDropdown = (event: MouseEvent) => {
  if (
    multiSelectRef.value &&
    event.target instanceof Node &&
    !multiSelectRef.value.contains(event.target)
  ) {
    showDropdown.value = false
  }
}
</script>
