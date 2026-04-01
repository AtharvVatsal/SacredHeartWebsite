const schoolInfo = {
  name: 'schoolInfo',
  title: 'School Information',
  type: 'document',
  fields: [
    { name: 'name', title: 'School Name', type: 'string' },
    { name: 'fullName', title: 'Full Name', type: 'string' },
    { name: 'tagline', title: 'Tagline', type: 'string' },
    { name: 'affiliation', title: 'Affiliation', type: 'string' },
    { name: 'established', title: 'Established Year', type: 'number' },
    { name: 'management', title: 'Management', type: 'string' },
    {
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        { name: 'street', type: 'string', title: 'Street' },
        { name: 'tehsil', type: 'string', title: 'Tehsil' },
        { name: 'district', type: 'string', title: 'District' },
        { name: 'state', type: 'string', title: 'State' },
        { name: 'pincode', type: 'string', title: 'Pincode' },
        { name: 'country', type: 'string', title: 'Country' },
      ],
    },
    {
      name: 'contact',
      title: 'Contact',
      type: 'object',
      fields: [
        { name: 'emails', type: 'array', of: [{ type: 'string' }], title: 'Emails' },
        { name: 'phones', type: 'array', of: [{ type: 'string' }], title: 'Phones' },
      ],
    },
  ],
}

export default schoolInfo