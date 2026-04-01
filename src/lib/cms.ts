import { sanityClient } from './sanity'
import { 
  schoolInfo as defaultSchoolInfo, 
  staffMembers, 
  notifications, 
  achievements, 
  class10Toppers, 
  class12Toppers, 
  officeBearers, 
  principalMessage, 
  schoolHistory as defaultSchoolHistory, 
  schoolAnthem as defaultSchoolAnthem, 
  quickLinks, 
  statistics, 
  navigation, 
  heroSection,
  facilities as defaultFacilities,
  studentLeaders as defaultStudentLeaders,
  batchPhotos
} from '@/data/school'
import type { Facility, StudentLeader, BatchYear } from '@/types'

// Fetch functions with fallback to hardcoded data
export async function getSchoolInfo() {
  try {
    const data = await sanityClient.fetch(`*[_type == "schoolInfo"][0]`)
    return data || defaultSchoolInfo
  } catch (error) {
    console.warn('Failed to fetch school info from CMS, using default:', error)
    return defaultSchoolInfo
  }
}

export async function getStaff() {
  try {
    const data = await sanityClient.fetch(`*[_type == "staff"] | order(name asc) {
      _id,
      name,
      designation,
      qualification,
      department,
      subject,
      "imageUrl": image.asset->url
    }`)
    if (data.length > 0) {
      return data.map((s: any) => ({
        id: s._id?.replace('staff-', '') || '0',
        name: s.name || '',
        role: s.designation || '',
        designation: s.designation || '',
        department: s.department || '',
        qualifications: s.qualification || '',
        qualification: s.qualification || '',
        subject: s.subject || '',
        image: s.imageUrl || undefined
      }))
    }
    return staffMembers
  } catch (error) {
    console.warn('Failed to fetch staff from CMS, using default:', error)
    return staffMembers
  }
}

export async function getNotifications() {
  try {
    const data = await sanityClient.fetch(`*[_type == "notification"] | order(date desc) {
      _id,
      title,
      description,
      date,
      category,
      important,
      link
    }`)
    return data.length > 0 ? data : notifications
  } catch (error) {
    console.warn('Failed to fetch notifications from CMS, using default:', error)
    return notifications
  }
}

export async function getAchievements() {
  try {
    const data = await sanityClient.fetch(`*[_type == "achievement"] | order(year desc) {
      _id,
      title,
      description,
      year,
      studentName,
      category,
      "imageUrl": image.asset->url
    }`)
    return data.length > 0 ? data : achievements
  } catch (error) {
    console.warn('Failed to fetch achievements from CMS, using default:', error)
    return achievements
  }
}

export async function getClass10Toppers() {
  try {
    const data = await sanityClient.fetch(`*[_type == "topper" && boardExam == "Class 10"] | order(percentage desc) {
      _id,
      name,
      boardExam,
      year,
      percentage
    }`)
    return data.length > 0 ? data : class10Toppers
  } catch (error) {
    console.warn('Failed to fetch Class 10 toppers from CMS, using default:', error)
    return class10Toppers
  }
}

export async function getClass12Toppers() {
  try {
    const data = await sanityClient.fetch(`*[_type == "topper" && boardExam == "Class 12"] | order(percentage desc) {
      _id,
      name,
      boardExam,
      year,
      percentage
    }`)
    return data.length > 0 ? data : class12Toppers
  } catch (error) {
    console.warn('Failed to fetch Class 12 toppers from CMS, using default:', error)
    return class12Toppers
  }
}

export async function getOfficeBearers() {
  try {
    const data = await sanityClient.fetch(`*[_type == "officeBearer"] | order(year desc) {
      _id,
      year,
      headGirl,
      headBoy,
      gamesCaptainGirls,
      gamesViceCaptainGirls,
      gamesCaptainBoys,
      gamesViceCaptainBoys,
      editorsInChief,
      "houseCaptains": houseCaptains[]->{house, captain, viceCaptain},
      prefects,
      "juniorCaptains": juniorCaptains[]->{house, captain, viceCaptain}
    }`)
    return data.length > 0 ? data : officeBearers
  } catch (error) {
    console.warn('Failed to fetch office bearers from CMS, using default:', error)
    return officeBearers
  }
}

export async function getGalleryEvents() {
  try {
    const data = await sanityClient.fetch(`*[_type == "galleryEvent"] | order(_createdAt desc) {
      _id,
      name,
      "imageUrl": image.asset->url,
      description,
      category
    }`)
    return data.length > 0 ? data : []
  } catch (error) {
    console.warn('Failed to fetch gallery events from CMS:', error)
    return []
  }
}

export async function getPrincipalMessage() {
  try {
    const data = await sanityClient.fetch(`*[_type == "principalMessage"][0]`)
    if (data) {
      return {
        name: data.name,
        title: data.title,
        message: data.message,
        yearsExperience: data.yearsExperience,
        studentsGuided: data.studentsGuided,
        imageUrl: data.image?.asset?.url
      }
    }
    return { message: principalMessage }
  } catch (error) {
    console.warn('Failed to fetch principal message from CMS, using default:', error)
    return { message: principalMessage }
  }
}

export async function getPageContent(pageKey: string) {
  try {
    const data = await sanityClient.fetch(`*[_type == "pageContent" && pageKey == $pageKey][0]`, { pageKey })
    return data || null
  } catch (error) {
    console.warn(`Failed to fetch page content for ${pageKey} from CMS:`, error)
    return null
  }
}

export async function getNavigation() {
  try {
    const data = await sanityClient.fetch(`*[_type == "navigation"] | order(order asc)`)
    return data.length > 0 ? data : navigation
  } catch (error) {
    console.warn('Failed to fetch navigation from CMS, using default:', error)
    return navigation
  }
}

export async function getStatistics() {
  try {
    const data = await sanityClient.fetch(`*[_type == "statistic"] | order(order asc)`)
    return data.length > 0 ? data : statistics
  } catch (error) {
    console.warn('Failed to fetch statistics from CMS, using default:', error)
    return statistics
  }
}

export async function getQuickLinks() {
  try {
    const data = await sanityClient.fetch(`*[_type == "quickLink"] | order(order asc)`)
    return data.length > 0 ? data : quickLinks
  } catch (error) {
    console.warn('Failed to fetch quick links from CMS, using default:', error)
    return quickLinks
  }
}

export async function getHeroSection() {
  try {
    const data = await sanityClient.fetch(`*[_type == "heroSection"][0]`)
    return data || heroSection
  } catch (error) {
    console.warn('Failed to fetch hero section from CMS, using default:', error)
    return heroSection
  }
}

export async function getFacilities() {
  try {
    const data = await sanityClient.fetch(`*[_type == "facility"] | order(order asc) {
      _id,
      name,
      description,
      icon,
      "imageUrl": image.asset->url
    }`)
    if (data.length > 0) {
      return data.map((f: any) => ({
        id: f._id || '',
        name: f.name || '',
        description: f.description || '',
        icon: f.icon || undefined,
        images: f.imageUrl ? [f.imageUrl] : []
      }))
    }
    return defaultFacilities
  } catch (error) {
    console.warn('Failed to fetch facilities from CMS, using default:', error)
    return defaultFacilities
  }
}

export async function getStudentLeaders() {
  try {
    const data = await sanityClient.fetch(`*[_type == "studentLeader"] | order(year desc) {
      _id,
      name,
      role,
      year,
      message,
      "imageUrl": image.asset->url
    }`)
    if (data.length > 0) {
      return data.map((s: any) => ({
        id: s._id || '',
        name: s.name || '',
        role: s.role || '',
        year: s.year || '',
        message: s.message || '',
        image: s.imageUrl || undefined
      }))
    }
    return defaultStudentLeaders
  } catch (error) {
    console.warn('Failed to fetch student leaders from CMS, using default:', error)
    return defaultStudentLeaders
  }
}

export async function getSchoolHistory() {
  try {
    const data = await sanityClient.fetch(`*[_type == "schoolHistory"][0]`)
    if (data) {
      return data.content || defaultSchoolHistory
    }
    return defaultSchoolHistory
  } catch (error) {
    console.warn('Failed to fetch school history from CMS, using default:', error)
    return defaultSchoolHistory
  }
}

export async function getSchoolAnthem() {
  try {
    const data = await sanityClient.fetch(`*[_type == "schoolAnthem"][0]`)
    if (data) {
      return data.lyrics || defaultSchoolAnthem
    }
    return defaultSchoolAnthem
  } catch (error) {
    console.warn('Failed to fetch school anthem from CMS, using default:', error)
    return defaultSchoolAnthem
  }
}

export async function getBatchYears() {
  try {
    const data = await sanityClient.fetch(`*[_type == "batchYear"] | order(year desc) {
      _id,
      year,
      "imageUrls": photos[].asset->url
    }`)
    if (data.length > 0) {
      return data.map((b: any) => ({
        year: b.year,
        photos: (b.imageUrls || []).map((url: string, i: number) => ({
          id: `${b.year}-${i}`,
          year: b.year,
          title: `Class of ${b.year}`,
          image: url
        }))
      }))
    }
    // Return batchPhotos from school.ts when CMS is empty
    return batchPhotos
  } catch (error) {
    console.warn('Failed to fetch batch years from CMS, using default:', error)
    return batchPhotos
  }
}