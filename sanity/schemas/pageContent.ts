const pageContent = {
  name: 'pageContent',
  title: 'Page Content',
  type: 'document',
  fields: [
    { name: 'pageKey', title: 'Page Identifier (e.g., "home", "about", "contact")', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'title', title: 'Page Title', type: 'string' },
    { name: 'subtitle', title: 'Subtitle', type: 'string' },
    { name: 'content', title: 'Main Content', type: 'text' },
    {
      name: 'sections',
      title: 'Content Sections',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'heading', title: 'Section Heading', type: 'string' },
        { name: 'content', title: 'Section Content', type: 'text' },
        { name: 'image', title: 'Section Image', type: 'image' },
        { name: 'order', title: 'Display Order', type: 'number' },
      ]}],
    },
    { name: 'metaDescription', title: 'SEO Description', type: 'text' },
  ],
  preview: {
    select: {
      title: 'pageKey',
      subtitle: 'title',
    },
  },
}

export default pageContent