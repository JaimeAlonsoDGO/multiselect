import { describe, it, expect, vi } from 'vitest'
import { useSelection } from '@/composables/useSelection'

describe('useSelection', () => {
  const mockEmit = vi.fn()
  const keyField = 'id'
  const initialOptions = [{ id: 1, name: 'Option 1' }]
  const multipleInitialOptions = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
  ]

  it('initializes correctly with modelValue', () => {
    const { selectedOptions } = useSelection(keyField, initialOptions, mockEmit)
    expect(selectedOptions.value).toEqual(initialOptions)
  })

  it('syncs selectedOptions when modelValue changes', () => {
    const { selectedOptions } = useSelection(keyField, [], mockEmit)
    expect(selectedOptions.value).toEqual([])

    selectedOptions.value = [...initialOptions]
    expect(selectedOptions.value).toEqual(initialOptions)
  })

  it('selectOption adds an option if not already selected', () => {
    const { selectedOptions, selectOption } = useSelection(keyField, [], mockEmit)

    selectOption({ id: 2, name: 'Option 2' })
    expect(selectedOptions.value).toEqual([{ id: 2, name: 'Option 2' }])
    expect(mockEmit).toHaveBeenCalledWith('update:modelValue', [{ id: 2, name: 'Option 2' }])
  })

  it('selectOption does nothing if option is already selected', () => {
    const { selectedOptions, selectOption } = useSelection(keyField, initialOptions, mockEmit)

    selectOption({ id: 1, name: 'Option 1' })
    expect(selectedOptions.value).toEqual(initialOptions) // Should remain unchanged
  })

  it('removeOption correctly removes an option', () => {
    const { selectedOptions, removeOption } = useSelection(keyField, initialOptions, mockEmit)

    removeOption({ id: 1, name: 'Option 1' })
    expect(selectedOptions.value).toEqual([])
    expect(mockEmit).toHaveBeenCalledWith('update:modelValue', [])
  })

  it('removeOption correctly from multiple options', () => {
    const { selectedOptions, removeOption } = useSelection(
      keyField,
      multipleInitialOptions,
      mockEmit,
    )

    removeOption({ id: 1, name: 'Option 1' })
    expect(selectedOptions.value).toEqual([{ id: 2, name: 'Option 2' }])
    expect(mockEmit).toHaveBeenCalledWith('update:modelValue', [{ id: 2, name: 'Option 2' }])
  })

  it('alreadySelected returns true if option is already selected', () => {
    const { alreadySelected } = useSelection(keyField, initialOptions, mockEmit)
    expect(alreadySelected({ id: 1, name: 'Option 1' })).toBe(true)
  })

  it('alreadySelected returns false if option is not selected', () => {
    const { alreadySelected } = useSelection(keyField, [], mockEmit)
    expect(alreadySelected({ id: 1, name: 'Option 1' })).toBe(false)
  })
})
