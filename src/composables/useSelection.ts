import { ref, watch } from 'vue'
import type { OptionListProps } from '@/components/OptionList/types'
import type { ListOptionsValidKeys } from '@/components/ListOptions/types'

export function useSelection(
  keyField: ListOptionsValidKeys,
  modelValue: OptionListProps[],
  emit: (event: 'update:modelValue', value: OptionListProps[]) => void,
) {
  const selectedOptions = ref<OptionListProps[]>([...modelValue])

  watch(
    () => modelValue,
    (newValue) => {
      selectedOptions.value = [...newValue]
    },
    { deep: true },
  )

  const alreadySelected = (option: OptionListProps) => {
    return selectedOptions.value.some((item) => item[keyField] === option[keyField])
  }

  const selectOption = (option: OptionListProps) => {
    if (!alreadySelected(option)) {
      const newSelection = [...selectedOptions.value, option]
      selectedOptions.value = newSelection
      emit('update:modelValue', newSelection)
    }
  }

  const removeOption = (option: OptionListProps) => {
    const newSelection = selectedOptions.value.filter((item) => item[keyField] !== option[keyField])
    selectedOptions.value = newSelection
    emit('update:modelValue', newSelection)
  }

  return { selectedOptions, selectOption, removeOption, alreadySelected }
}
