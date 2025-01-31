import type { Meta, StoryObj } from '@storybook/vue3'
import ListOptions from '@/components/ListOptions/ListOptions.vue'

const meta = {
  title: 'ListOptions',
  component: ListOptions,
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description:
        'The options to display in the list. Support an array of objects with id and name properties',
    },
    keyField: {
      control: { type: 'text' },
      description:
        'The field to use as the key for each option. Defaults to "id" and must be unique',
    },
    labelField: {
      control: { type: 'text' },
      description: 'The field to use as the label for each option. Defaults to "name"',
    },
    default: {
      description: 'Slot for custom content inside the option item',
      table: {
        type: { summary: 'VNode' },
      },
      control: false,
    },
  },
} satisfies Meta<typeof ListOptions>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
    ],
  },
}
