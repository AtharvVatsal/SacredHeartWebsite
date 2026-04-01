const quickLink = {
  name: 'quickLink',
  title: 'Quick Link',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'href', title: 'Link URL', type: 'string' },
    { name: 'icon', title: 'Icon Name', type: 'string' },
    { name: 'order', title: 'Display Order', type: 'number' },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'href',
    },
  },
}

export default quickLink