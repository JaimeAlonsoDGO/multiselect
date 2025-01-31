import type { Meta, StoryObj } from '@storybook/vue3'
import SelectedItem from '@/components/SelectedItem/SelectedItem.vue'

const meta = {
  title: 'SelectedItem',
  component: SelectedItem,
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: { type: 'number' },
      description: 'The id of the item',
    },
    name: {
      control: { type: 'text' },
      description: 'The label to display in the item',
    },
  },
} satisfies Meta<typeof SelectedItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: 1,
    name: 'Item 1',
  },
}
