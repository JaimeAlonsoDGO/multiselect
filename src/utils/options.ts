import type { OptionListProps } from '@/components/OptionList/types'
import type { ListOptionsValidKeys } from '@/components/ListOptions/types'

export const isNewOption = (option: OptionListProps, keyField: ListOptionsValidKeys) => {
  return +option[keyField] < 0
}
