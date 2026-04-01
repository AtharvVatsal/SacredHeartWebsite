const principalMessage = {
  name: 'principalMessage',
  title: "Principal's Message",
  type: 'document',
  fields: [
    { name: 'name', title: 'Principal Name', type: 'string' },
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'message', title: 'Message', type: 'text' },
    { name: 'yearsExperience', title: 'Years of Experience', type: 'string' },
    { name: 'studentsGuided', title: 'Students Guided', type: 'string' },
    { name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } },
  ],
}

export default principalMessage