const batchYear = {
  name: 'batchYear',
  title: 'Pass Out Batch',
  type: 'document',
  fields: [
    {
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1970).max(2030),
    },
    {
      name: 'photos',
      title: 'Batch Photos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'year',
    },
  },
}

export default batchYear