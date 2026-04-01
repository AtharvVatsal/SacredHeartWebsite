const pageSection = {
  name: 'pageSection',
  title: 'Page Section',
  type: 'document',
  fields: [
    { name: 'title', title: 'Section Title', type: 'string' },
    { name: 'slug', title: 'Slug (unique identifier)', type: 'string' },
    { name: 'subtitle', title: 'Subtitle', type: 'string' },
    { name: 'content', title: 'Main Content', type: 'text' },
    { 
      name: 'contentType', 
      title: 'Content Type', 
      type: 'string',
      options: {
        list: [
          { title: 'History', value: 'history' },
          { title: 'Aims', value: 'aims' },
          { title: 'Syllabus', value: 'syllabus' },
          { title: 'Leave & Absence', value: 'leave' },
          { title: 'Fee Structure', value: 'fee' },
          { title: 'Uniform', value: 'uniform' },
          { title: 'Rules', value: 'rules' },
          { title: 'Contact', value: 'contact' },
          { title: 'Other', value: 'other' },
        ],
      },
    },
    { name: 'additionalContent', title: 'Additional Content (Array)', type: 'array', of: [{ type: 'object', fields: [
      { name: 'heading', title: 'Heading', type: 'string' },
      { name: 'text', title: 'Text', type: 'text' },
    ]}]},
    { name: 'order', title: 'Display Order', type: 'number' },
  ],
}

export default pageSection