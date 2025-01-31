import type { LisOptionsProps } from '../ListOptions/types'
import type { OptionListProps } from '../OptionList/types'

export interface MultiSelectProps extends LisOptionsProps {
  modelValue?: OptionListProps[]
  label?: string
}
