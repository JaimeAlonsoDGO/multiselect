import type { Meta, StoryObj } from '@storybook/vue3'
import SelectedItem from '@/components/SelectedItem/SelectedItem.vue'

const meta = {
  title: 'SelectedItem',
  component: SelectedItem,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'The label to display in the item',
    },
  },
} satisfies Meta<typeof SelectedItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Item 1',
  },
}
