const studentLeader = {
  name: 'studentLeader',
  title: 'Student Leader',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          { title: 'Head Boy', value: 'headBoy' },
          { title: 'Head Girl', value: 'headGirl' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'year',
      title: 'Academic Year',
      type: 'string',
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text',
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
      subtitle: 'role',
    },
  },
}

export default studentLeader