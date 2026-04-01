const notification = {
  name: 'notification',
  title: 'Notification',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Academic', value: 'academic' },
          { title: 'Event', value: 'event' },
          { title: 'Admission', value: 'admission' },
          { title: 'Exam', value: 'exam' },
          { title: 'Holiday', value: 'holiday' },
          { title: 'General', value: 'general' },
        ],
      },
    },
    {
      name: 'important',
      title: 'Mark as Important',
      type: 'boolean',
    },
    {
      name: 'link',
      title: 'Link (optional)',
      type: 'url',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
    },
  },
}

export default notification
