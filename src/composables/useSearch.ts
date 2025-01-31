import { computed, ref } from 'vue'
import { normalizeText } from '@/utils/text'

import type { OptionListProps } from '@/components/OptionList/types'
import type { ListOptionsValidKeys } from '@/components/ListOptions/types'

export function useSearch(
  options: OptionListProps[],
  labelField: ListOptionsValidKeys,
  alreadySelected: (option: OptionListProps) => boolean,
) {
  const searchTerm = ref('')

  const normalizedSearchTerm = computed(() => normalizeText(searchTerm.value))

  const filteredOptions = computed(() => {
    if (!searchTerm.value) {
      return options.map((option: OptionListProps) => ({
        ...option,
        selected: alreadySelected(option),
      }))
    }
    const filtered = options.filter((option: OptionListProps) => {
      const normalizedLabel = normalizeText(option[labelField]?.toString())
      return normalizedLabel.includes(normalizedSearchTerm.value)
    })

    if (filtered.length === 0) {
      return [{ id: -Date.now(), name: searchTerm.value }]
    }

    return filtered
  })

  return { searchTerm, filteredOptions, normalizedSearchTerm }
}
