import { 
  schoolInfo as defaultSchoolInfo, 
  staffMembers, 
  notifications, 
  achievements, 
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

// All functions now return local data directly (no CMS)
export async function getSchoolInfo() {
  return defaultSchoolInfo
}

export async function getStaff() {
  return staffMembers
}

export async function getNotifications() {
  return notifications
}

export async function getAchievements() {
  return achievements
}

export async function getOfficeBearers() {
  return officeBearers
}

export async function getGalleryEvents() {
  return []
}

export async function getPrincipalMessage() {
  return { message: principalMessage }
}

export async function getPageContent(_pageKey: string) {
  return null
}

export async function getNavigation() {
  return navigation
}

export async function getStatistics() {
  return statistics
}

export async function getQuickLinks() {
  return quickLinks
}

export async function getHeroSection() {
  return heroSection
}

export async function getFacilities() {
  return defaultFacilities
}

export async function getStudentLeaders() {
  return defaultStudentLeaders
}

export async function getSchoolHistory() {
  return defaultSchoolHistory
}

export async function getSchoolAnthem() {
  return defaultSchoolAnthem
}

export async function getBatchYears() {
  return batchPhotos
}