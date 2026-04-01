const achievement = {
  name: 'achievement',
  title: 'Achievement',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'year', title: 'Year', type: 'number' },
    { name: 'studentName', title: 'Student Name', type: 'string' },
    { 
      name: 'category', 
      title: 'Category', 
      type: 'string',
      options: {
        list: [
          { title: 'Academic', value: 'academic' },
          { title: 'Sports', value: 'sports' },
          { title: 'Cultural', value: 'cultural' },
          { title: 'Other', value: 'other' },
        ],
      },
    },
    { name: 'image', title: 'Image', type: 'image' },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'year',
    },
  },
}

export default achievement