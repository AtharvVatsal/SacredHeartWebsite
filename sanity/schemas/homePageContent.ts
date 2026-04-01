const homePageContent = {
  name: 'homePageContent',
  title: 'Homepage Section',
  type: 'document',
  fields: [
    { name: 'sectionKey', title: 'Section Key (unique identifier)', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'subtitle', title: 'Subtitle', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'ctaText', title: 'Button Text', type: 'string' },
    { name: 'ctaLink', title: 'Button Link', type: 'string' },
    { name: 'image', title: 'Background Image', type: 'image' },
    { name: 'order', title: 'Display Order', type: 'number' },
    { name: 'isActive', title: 'Show on Website', type: 'boolean', initialValue: true },
  ],
  preview: {
    select: {
      title: 'sectionKey',
      subtitle: 'title',
    },
  },
}

export default homePageContent