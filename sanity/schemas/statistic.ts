const statistic = {
  name: 'statistic',
  title: 'Statistic',
  type: 'document',
  fields: [
    { name: 'label', title: 'Label', type: 'string' },
    { name: 'value', title: 'Value', type: 'string' },
    { name: 'suffix', title: 'Suffix (e.g., +, %)', type: 'string' },
    { name: 'order', title: 'Display Order', type: 'number' },
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'value',
    },
  },
}

export default statistic