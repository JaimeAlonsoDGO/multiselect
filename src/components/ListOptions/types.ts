import type { OptionListProps } from '../OptionList/types'

export type ListOptionsValidKeys = keyof Pick<OptionListProps, 'id' | 'name'>

export interface LisOptionsProps {
  options: OptionListProps[]
  keyField?: ListOptionsValidKeys
  labelField?: ListOptionsValidKeys
}
