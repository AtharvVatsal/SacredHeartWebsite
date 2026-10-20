// School Info Types
export interface SchoolInfo {
  name: string
  fullName: string
  tagline: string
  affiliation: string
  established: number
  management: string
  principal: string
  address: Address
  contact: ContactInfo
}

export interface Address {
  street: string
  tehsil: string
  district: string
  state: string
  pincode: string
  country: string
}

export interface ContactInfo {
  emails: string[]
  phones: string[]
  addresses: string[]
}

// Page Content Types
export interface Page {
  id: string
  title: string
  slug: string
  content: string
  metaDescription?: string
}

export interface NavigationItem {
  text: string
  href: string
  children?: NavigationItem[]
  external?: boolean
}

// Staff Types
export interface StaffMember {
  id: string
  name: string
  role: string
  designation?: string
  department: string
  qualifications: string
  image?: string
  email?: string
}

// Student Leader Types
export interface StudentLeader {
  id: string
  name: string
  role: string
  initials?: string
  year: string
  message?: string
  image?: string
}

export interface HouseCaptain {
  house: string
  captain: string
  viceCaptain: string
}

export interface OfficeBearerSession {
  year: string
  headGirl: string
  headBoy: string
  // Photos only for sessions that have them
  headGirlImage?: string
  headBoyImage?: string
  gamesCaptainGirls: string
  gamesViceCaptainGirls: string
  gamesCaptainBoys: string
  gamesViceCaptainBoys: string
  editorsInChief: string
  editorialMembers?: string
  houseCaptains: HouseCaptain[]
  prefects: { names: string; house?: string }[]
  juniorCaptains?: { captain: string; viceCaptain: string; house: string }[]
}

// Batch Photo Types
export interface BatchPhoto {
  id: string
  year: number
  title: string
  image?: string
}

export interface BatchYear {
  year: number
  photos: BatchPhoto[]
}

// Achievement Types
export interface Achievement {
  id: string
  title: string
  description: string
  year: number
  studentName?: string
  category: 'academic' | 'sports' | 'cultural' | 'other'
  image?: string
}

// Topper Types
export interface Topper {
  id: string
  name: string
  boardExam: 'Class 10' | 'Class 12'
  year: number
  percentage: number
  stream?: string
  image?: string
}

// Gallery Types
export interface GalleryImage {
  id: string
  url: string
  caption?: string
  category: 'events' | 'sports' | 'cultural' | 'academic'
  date?: string
}

// Facility Types
export interface Facility {
  id: string
  name: string
  description: string
  icon?: string
  images?: string[]
}

// Notification Types
export interface Notification {
  id: string
  title: string
  description: string
  date: string
  important: boolean
  attachment?: string
}

// Homepage Sections
export interface HeroSection {
  title: string
  subtitle: string
  ctaText: string
  ctaLink: string
  backgroundImage?: string
}

export interface Stat {
  label: string
  value: string
  suffix?: string
}

export interface QuickLink {
  title: string
  href: string
  icon?: string
}

// Form Types
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface AdmissionFormData {
  studentName: string
  fatherName: string
  motherName: string
  dateOfBirth: string
  class: string
  previousSchool?: string
  email: string
  phone: string
  address: string
}
