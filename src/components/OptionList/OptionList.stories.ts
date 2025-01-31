import type { Meta, StoryObj } from '@storybook/vue3'
import OptionList from '@/components/OptionList/OptionList.vue'

const meta = {
  title: 'OptionList',
  component: OptionList,
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: { type: 'number' },
      description: 'The id of the item',
    },
    name: {
      control: { type: 'text' },
      description: 'The name of the item',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable the item',
    },
    selected: {
      control: { type: 'boolean' },
      description: 'Mark the item as selected',
    },
    default: {
      description: 'Slot for custom content inside the option item',
      table: {
        type: { summary: 'VNode' },
      },
      control: false,
    },
  },
} satisfies Meta<typeof OptionList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: 1,
    name: 'Item 1',
  },
}

export const Disabled: Story = {
  args: {
    id: 1,
    name: 'Item 1',
    disabled: true,
  },
}

export const Selected: Story = {
  args: {
    id: 1,
    name: 'Item 1',
    selected: true,
  },
}
