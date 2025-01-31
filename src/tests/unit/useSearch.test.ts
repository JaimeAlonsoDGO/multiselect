import { describe, it, expect } from 'vitest'
import { useSearch } from '@/composables/useSearch'

import type { OptionListProps } from '@/components/OptionList/types'

describe('useSearch composable', () => {
  const options = [
    { id: 1, name: 'Pie chart' },
    { id: 2, name: 'Bar chart' },
    { id: 3, name: 'Line chart' },
  ]

  const { name: testItemName, id: testItemId } = options.find(
    (item) => item.id === 2,
  ) as OptionListProps

  const alreadySelected = (option: OptionListProps) => option.id === testItemId

  it('initializes correctly, with an item already selected', () => {
    const { searchTerm, filteredOptions } = useSearch(options, 'name', alreadySelected)

    expect(searchTerm.value).toBe('')
    expect(filteredOptions.value).toHaveLength(3)
    expect(filteredOptions.value[1].selected).toBe(true)
  })

  it('filters correctly ignoring uppercase', () => {
    const { searchTerm, filteredOptions } = useSearch(options, 'name', alreadySelected)

    searchTerm.value = 'bar'
    expect(filteredOptions.value).toHaveLength(1)
    expect(filteredOptions.value[0].name).toBe(testItemName)

    searchTerm.value = 'BAR'
    expect(filteredOptions.value).toHaveLength(1)
    expect(filteredOptions.value[0].name).toBe(testItemName)
  })

  it('filters correctly ignoring accents', () => {
    const { searchTerm, filteredOptions } = useSearch(options, 'name', alreadySelected)

    searchTerm.value = 'BÁR CHART'
    expect(filteredOptions.value).toHaveLength(1)
    expect(filteredOptions.value[0].name).toBe(testItemName)
  })

  it('filters correctly ignoring extra spaces', () => {
    const { searchTerm, filteredOptions } = useSearch(options, 'name', alreadySelected)

    searchTerm.value = '   Bar   '
    expect(filteredOptions.value).toHaveLength(1)
    expect(filteredOptions.value[0].name).toBe(testItemName)
  })

  it('returns a new option when no matches are found', () => {
    const { searchTerm, filteredOptions } = useSearch(options, 'name', alreadySelected)

    searchTerm.value = 'Custom chart'
    expect(filteredOptions.value).toHaveLength(1)
    expect(filteredOptions.value[0].id).toBeLessThan(0)
    expect(filteredOptions.value[0].name).toBe('Custom chart')
  })
})
