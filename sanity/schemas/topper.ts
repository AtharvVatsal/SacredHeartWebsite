const topper = {
  name: 'topper',
  title: 'Board Exam Topper',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Student Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'percentage',
      title: 'Percentage',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0).max(100),
    },
    {
      name: 'class',
      title: 'Class',
      type: 'string',
      options: {
        list: [
          { title: 'Class 10', value: '10' },
          { title: 'Class 12', value: '12' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'session',
      title: 'Session',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'stream',
      title: 'Stream (for Class 12)',
      type: 'string',
      options: {
        list: [
          { title: 'Science', value: 'Science' },
          { title: 'Commerce', value: 'Commerce' },
          { title: 'Arts', value: 'Arts' },
        ],
      },
    },
    {
      name: 'rank',
      title: 'Rank',
      type: 'number',
    },
    {
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'percentage',
      media: 'image',
    },
  },
}

export default topper
