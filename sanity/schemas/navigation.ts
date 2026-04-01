const navigationItem = {
  name: 'navigationItem',
  title: 'Navigation Item',
  type: 'object',
  fields: [
    { name: 'text', title: 'Label', type: 'string' },
    { name: 'href', title: 'Link', type: 'string' },
    { name: 'external', title: 'External Link', type: 'boolean', initialValue: false },
    {
      name: 'children',
      title: 'Submenu Items',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'text', title: 'Label', type: 'string' },
        { name: 'href', title: 'Link', type: 'string' },
        { name: 'external', title: 'External Link', type: 'boolean', initialValue: false },
      ]}],
    },
  ],
}

export default navigationItem