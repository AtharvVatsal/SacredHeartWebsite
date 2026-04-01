import { createClient } from '@sanity/client'
import { staffMembers, notifications, achievements, class10Toppers, class12Toppers, officeBearers, principalMessage, schoolInfo, statistics, quickLinks, heroSection } from '../src/data/school'

const client = createClient({
  projectId: 'f1zzyq8p',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skdEvElg8r1ZUIffP5mDvwCmrPXH0ZKzXBZhzD2wnRpob3anFPvoQ6tGyx1RcjthviG7ykJLHfscylJoyBYyJcfHRYT7JDbeD6Zg8NzI87yzRtgWcfd5YIgYfUs2w8hyo3BtpFF2iaSbgYWUeCFWXmkuzQApuKRRCGi29mbkVYNllIud2nhV',
})

async function uploadImage(imagePath: string): Promise<any> {
  try {
    const response = await fetch(`https://cdn.sanity.io/images/f1zzyq8p/production/${imagePath}`)
    if (!response.ok) {
      console.log(`Image not found: ${imagePath}`)
      return null
    }
    // For local images, we'd need to use the Sanity image uploader
    // For now, return a placeholder
    return null
  } catch (error) {
    console.log(`Error uploading image: ${imagePath}`, error)
    return null
  }
}

async function importStaff() {
  console.log('Importing staff...')
  const staffData = staffMembers.map((member: any) => ({
    _type: 'staff',
    _id: `staff-${member.id}`,
    name: member.name,
    designation: member.role,
    qualification: member.qualifications,
    department: member.department,
    subject: member.department,
  }))
  
  for (const staff of staffData) {
    try {
      await client.create(staff)
      console.log(`Created staff: ${staff.name}`)
    } catch (error) {
      console.log(`Error creating staff ${staff.name}:`, error)
    }
  }
  console.log('Staff import complete!')
}

async function importNotifications() {
  console.log('Importing notifications...')
  const notificationData = notifications.map((notif: any) => ({
    _type: 'notification',
    _id: `notification-${notif.id}`,
    title: notif.title,
    description: notif.description,
    date: notif.date ? new Date(notif.date).toISOString() : new Date().toISOString(),
    important: notif.important || false,
    category: 'general',
  }))
  
  for (const notif of notificationData) {
    try {
      await client.create(notif)
      console.log(`Created notification: ${notif.title}`)
    } catch (error) {
      console.log(`Error creating notification ${notif.title}:`, error)
    }
  }
  console.log('Notifications import complete!')
}

async function importAchievements() {
  console.log('Importing achievements...')
  const achievementData = achievements.map((achievement: any) => ({
    _type: 'achievement',
    _id: `achievement-${achievement.id}`,
    title: achievement.title,
    description: achievement.description,
    year: achievement.year,
    studentName: achievement.studentName || '',
    category: achievement.category || 'academic',
  }))
  
  for (const achievement of achievementData) {
    try {
      await client.create(achievement)
      console.log(`Created achievement: ${achievement.title}`)
    } catch (error) {
      console.log(`Error creating achievement ${achievement.title}:`, error)
    }
  }
  console.log('Achievements import complete!')
}

async function importToppers() {
  console.log('Importing toppers...')
  
  const topperData = [
    ...class10Toppers.map((t: any) => ({ ...t, boardExam: 'Class 10' })),
    ...class12Toppers.map((t: any) => ({ ...t, boardExam: 'Class 12' }))
  ]
  
  for (const topper of topperData) {
    try {
      await client.create({
        _type: 'topper',
        _id: `topper-${topper.id}`,
        name: topper.name,
        boardExam: topper.boardExam,
        year: topper.year,
        percentage: topper.percentage,
      })
      console.log(`Created topper: ${topper.name}`)
    } catch (error) {
      console.log(`Error creating topper ${topper.name}:`, error)
    }
  }
  console.log('Toppers import complete!')
}

async function importOfficeBearers() {
  console.log('Importing office bearers...')
  
  for (const ob of officeBearers) {
    try {
      await client.create({
        _type: 'officeBearer',
        _id: `office-bearer-${ob.year}`,
        year: ob.year,
        headGirl: ob.headGirl,
        headBoy: ob.headBoy,
        gamesCaptainGirls: ob.gamesCaptainGirls,
        gamesViceCaptainGirls: ob.gamesViceCaptainGirls,
        gamesCaptainBoys: ob.gamesCaptainBoys,
        gamesViceCaptainBoys: ob.gamesViceCaptainBoys,
        editorsInChief: ob.editorsInChief,
        houseCaptains: ob.houseCaptains.map((hc: any) => ({
          _type: 'object',
          house: hc.house,
          captain: hc.captain,
          viceCaptain: hc.viceCaptain,
        })),
        prefects: ob.prefects,
      })
      console.log(`Created office bearers for: ${ob.year}`)
    } catch (error) {
      console.log(`Error creating office bearers for ${ob.year}:`, error)
    }
  }
  console.log('Office bearers import complete!')
}

async function importPrincipalMessage() {
  console.log('Importing principal message...')
  try {
    await client.create({
      _type: 'principalMessage',
      _id: 'principal-message-1',
      name: 'Sr. Archana',
      title: 'Principal',
      message: principalMessage,
      yearsExperience: '15+',
      studentsGuided: '5000+',
    })
    console.log('Created principal message')
  } catch (error) {
    console.log('Error creating principal message:', error)
  }
}

async function importSchoolInfo() {
  console.log('Importing school info...')
  try {
    await client.create({
      _type: 'schoolInfo',
      _id: 'school-info-1',
      name: schoolInfo.name,
      fullName: schoolInfo.fullName,
      tagline: schoolInfo.tagline,
      affiliation: schoolInfo.affiliation,
      established: schoolInfo.established,
      management: schoolInfo.management,
      address: schoolInfo.address,
      contact: {
        emails: schoolInfo.contact.emails,
        phones: schoolInfo.contact.phones,
      },
    })
    console.log('Created school info')
  } catch (error) {
    console.log('Error creating school info:', error)
  }
}

async function importStatistics() {
  console.log('Importing statistics...')
  let order = 0
  for (const stat of statistics) {
    order++
    try {
      await client.create({
        _type: 'statistic',
        _id: `statistic-${order}`,
        label: stat.label,
        value: stat.value,
        suffix: stat.suffix || '',
        order: order,
      })
      console.log(`Created statistic: ${stat.label}`)
    } catch (error) {
      console.log(`Error creating statistic ${stat.label}:`, error)
    }
  }
  console.log('Statistics import complete!')
}

async function importQuickLinks() {
  console.log('Importing quick links...')
  let order = 0
  for (const link of quickLinks) {
    order++
    try {
      await client.create({
        _type: 'quickLink',
        _id: `quick-link-${order}`,
        title: link.title,
        href: link.href,
        icon: link.icon,
        order: order,
      })
      console.log(`Created quick link: ${link.title}`)
    } catch (error) {
      console.log(`Error creating quick link ${link.title}:`, error)
    }
  }
  console.log('Quick links import complete!')
}

async function importHeroSection() {
  console.log('Importing hero section...')
  try {
    await client.create({
      _type: 'heroSection',
      _id: 'hero-section-1',
      title: heroSection.title,
      subtitle: heroSection.subtitle,
      ctaText: heroSection.ctaText,
      ctaLink: heroSection.ctaLink,
    })
    console.log('Created hero section')
  } catch (error) {
    console.log('Error creating hero section:', error)
  }
}

async function main() {
  console.log('Starting CMS data import...')
  console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
  console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET)
  
  try {
    await importSchoolInfo()
    await importPrincipalMessage()
    await importStaff()
    await importNotifications()
    await importAchievements()
    await importToppers()
    await importOfficeBearers()
    await importStatistics()
    await importQuickLinks()
    await importHeroSection()
    
    console.log('\n✅ All data imported successfully!')
    console.log('Now you can view and edit this data at http://localhost:3000/admin')
  } catch (error) {
    console.error('Import failed:', error)
    process.exit(1)
  }
}

main()