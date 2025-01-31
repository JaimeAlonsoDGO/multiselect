import type { Meta, StoryObj } from '@storybook/vue3'
import MultiSelect from '@/components/MultiSelect/MultiSelect.vue'

const meta = {
  title: 'MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'The label to display above the list',
    },
    options: {
      control: 'object',
      description: 'The options to display in the list. Support an array of strings',
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
  },
} satisfies Meta<typeof MultiSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Select chart type',
    options: [
      {
        id: 1,
        name: 'Pie chart',
      },
      {
        id: 2,
        name: 'Bar chart',
      },
      {
        id: 3,
        name: 'Line chart',
      },
      {
        id: 4,
        name: 'Area chart',
      },
      {
        id: 5,
        name: 'Scatter chart',
      },
      {
        id: 6,
        name: 'Bubble chart',
      },
    ],
    keyField: 'id',
    labelField: 'name',
  },
}
