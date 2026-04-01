import { type StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('🏫 Sacred Heart School CMS')
    .items([
      // School Info
      S.listItem()
        .title('🏫 School Information')
        .child(
          S.documentTypeList('schoolInfo').title('📋 Basic Details')
        ),

      // Principal Message
      S.listItem()
        .title('👩‍🏫 Principal Message')
        .child(
          S.documentTypeList('principalMessage').title('👩‍🏫 Principal Message')
        ),

      // Homepage
      S.listItem()
        .title('🏠 Homepage')
        .child(
          S.list()
            .title('🏠 Homepage')
            .items([
              S.documentTypeListItem('heroSection').title('🎆 Hero Banner'),
              S.documentTypeListItem('statistic').title('📊 Statistics'),
              S.documentTypeListItem('quickLink').title('⚡ Quick Links'),
            ])
        ),

      // Staff
      S.listItem()
        .title('👨‍🏫 Staff & Faculty')
        .child(S.documentTypeList('staff').title('👨‍🏫 All Staff Members')),

      // Students
      S.listItem()
        .title('🎓 Students')
        .child(
          S.list()
            .title('🎓 Students')
            .items([
              S.documentTypeListItem('topper').title('🎓 Toppers'),
              S.documentTypeListItem('officeBearer').title('🏅 Office Bearers'),
              S.documentTypeListItem('achievement').title('🏆 Achievements'),
            ])
        ),

      // Gallery
      S.listItem()
        .title('🖼️ Gallery')
        .child(S.documentTypeList('galleryEvent').title('🖼️ Event Photos')),

      // Notifications
      S.listItem()
        .title('📢 Notifications')
        .child(S.documentTypeList('notification').title('📢 All Notifications')),
    ])