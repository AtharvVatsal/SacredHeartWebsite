const websitePage = {
  name: 'websitePage',
  title: 'Website Page Content',
  type: 'document',
  fields: [
    { 
      name: 'pageName', 
      title: 'Page Name', 
      type: 'string',
      options: {
        list: [
          { title: 'Home', value: 'home' },
          { title: 'About', value: 'about' },
          { title: 'History', value: 'history' },
          { title: 'Our Aims', value: 'aims' },
          { title: 'Principal Message', value: 'principal' },
          { title: 'Staff', value: 'staff' },
          { title: 'Office Bearers', value: 'office-bearers' },
          { title: 'Pass Out Batches', value: 'pass-out-batches' },
          { title: 'Academics', value: 'academics' },
          { title: 'Syllabus & Homework', value: 'syllabus-homework' },
          { title: 'Leave & Absence', value: 'leave-absence' },
          { title: 'Admission', value: 'admission' },
          { title: 'Fee Structure', value: 'fee-structure' },
          { title: 'Uniform', value: 'uniform' },
          { title: 'Rules', value: 'rules' },
          { title: 'Achievements', value: 'achievements' },
          { title: 'Toppers', value: 'toppers' },
          { title: 'Gallery', value: 'gallery' },
          { title: 'Notifications', value: 'notifications' },
          { title: 'Contact', value: 'contact' },
        ],
      },
    },
    { name: 'pageTitle', title: 'Page Title (H1)', type: 'string' },
    { name: 'pageSubtitle', title: 'Page Subtitle', type: 'string' },
    { name: 'mainContent', title: 'Main Content', type: 'text' },
    { name: 'additionalSections', title: 'Additional Sections', type: 'array', of: [{ type: 'object', fields: [
      { name: 'sectionTitle', title: 'Section Title', type: 'string' },
      { name: 'sectionContent', title: 'Section Content', type: 'text' },
      { name: 'sectionOrder', title: 'Order', type: 'number' },
    ]}]},
    { name: 'isPublished', title: 'Show on Website', type: 'boolean', initialValue: true },
  ],
  preview: {
    select: {
      title: 'pageName',
      subtitle: 'pageTitle',
    },
  },
}

export default websitePage