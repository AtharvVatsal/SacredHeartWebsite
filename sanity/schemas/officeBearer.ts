const officeBearer = {
  name: 'officeBearer',
  title: 'Office Bearer',
  type: 'document',
  fields: [
    {
      name: 'year',
      title: 'Session Year',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'headBoy',
      title: 'Head Boy Name',
      type: 'string',
    },
    {
      name: 'headBoyImage',
      title: 'Head Boy Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'headGirl',
      title: 'Head Girl Name',
      type: 'string',
    },
    {
      name: 'headGirlImage',
      title: 'Head Girl Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'gamesCaptainGirls',
      title: 'Games Captain (Girls)',
      type: 'string',
    },
    {
      name: 'gamesViceCaptainGirls',
      title: 'Games Vice Captain (Girls)',
      type: 'string',
    },
    {
      name: 'gamesCaptainBoys',
      title: 'Games Captain (Boys)',
      type: 'string',
    },
    {
      name: 'gamesViceCaptainBoys',
      title: 'Games Vice Captain (Boys)',
      type: 'string',
    },
    {
      name: 'editorsInChief',
      title: 'Editors in Chief',
      type: 'string',
    },
    {
      name: 'houseCaptains',
      title: 'House Captains',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'house', title: 'House Name', type: 'string' },
            { name: 'captain', title: 'Captain', type: 'string' },
            { name: 'viceCaptain', title: 'Vice Captain', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'prefects',
      title: 'Prefects',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'house', title: 'House Name', type: 'string' },
            { name: 'names', title: 'Prefect Names', type: 'string' },
          ],
        },
      ],
    },
  ],
}

export default officeBearer
