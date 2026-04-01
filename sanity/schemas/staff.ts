const staff = {
  name: 'staff',
  title: 'Staff Member',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'designation',
      title: 'Designation',
      type: 'string',
    },
    {
      name: 'qualification',
      title: 'Qualification',
      type: 'string',
    },
    {
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          { title: 'Principal', value: 'principal' },
          { title: 'Vice Principal', value: 'vice-principal' },
          { title: 'Teaching', value: 'teaching' },
          { title: 'Non-Teaching', value: 'non-teaching' },
          { title: 'Admin', value: 'admin' },
        ],
      },
    },
    {
      name: 'subject',
      title: 'Subject',
      type: 'string',
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
      subtitle: 'designation',
      media: 'image',
    },
  },
}

export default staff
