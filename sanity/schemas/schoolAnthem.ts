const schoolAnthem = {
  name: 'schoolAnthem',
  title: 'School Anthem',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'lyrics',
      title: 'Anthem Lyrics',
      type: 'text',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}

export default schoolAnthem