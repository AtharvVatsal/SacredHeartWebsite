const schoolHistory = {
  name: 'schoolHistory',
  title: 'School History',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'content',
      title: 'History Content',
      type: 'text',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}

export default schoolHistory