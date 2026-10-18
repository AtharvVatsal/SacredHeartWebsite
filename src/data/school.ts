import type { 
  SchoolInfo, 
  NavigationItem, 
  HeroSection, 
  Stat,
  QuickLink,
  StaffMember,
  StudentLeader,
  OfficeBearerSession,
  Achievement,
  Topper,
  GalleryImage,
  Facility,
  Notification,
  Page,
  BatchYear
} from '@/types'

// School Information
export const schoolInfo: SchoolInfo = {
  name: 'Sacred Heart Sr. Sec. School',
  fullName: 'Sacred Heart Senior Secondary School',
  tagline: 'Nurturing Hearts, Shaping Futures',
  affiliation: 'CISCE, New Delhi',
  established: 1969,
  management: 'Sisters of Charity of Jesus and Mary',
  address: {
    street: 'P.O. Sidhpur',
    tehsil: 'Dharamshala',
    district: 'Kangra',
    state: 'Himachal Pradesh',
    pincode: '176057',
    country: 'India'
  },
  contact: {
    emails: ['scjmshs.sidhpur@gmail.com'],
    phones: ['01892-222428', '86290-99633'],
    addresses: []
  }
}

// Navigation Structure
export const navigation: NavigationItem[] = [
  {
    text: 'Home',
    href: '/',
  },
  {
    text: 'About Us',
    href: '/about',
    children: [
      { text: 'History', href: '/about/history' },
      { text: 'Our Aims', href: '/about/aims' },
      { text: 'Principal\'s Message', href: '/about/principal' },
      { text: 'Staff', href: '/about/staff' },
      { text: 'Office Bearers', href: '/about/office-bearers' },
      { text: 'Pass Out Batches', href: '/about/pass-out-batches' },
    ]
  },
  {
    text: 'Academics',
    href: '/academics',
    children: [
      { text: 'Syllabus & Homework', href: '/academics/syllabus-homework' },
      { text: 'Leave & Absence', href: '/academics/leave-absence' },
      { text: 'Academic Calendar', href: '/academics/calendar' },
      { text: 'CISCE (Rules for Documents)', href: 'https://shsdharamshala.com/wp-content/uploads/2025/05/CISE-DOC.pdf', external: true },
    ]
  },
  {
    text: 'Admission',
    href: '/admission',
    children: [
      { text: 'Register', href: '/admission/register' },
      { text: 'Fee Structure', href: '/admission/fee-structure' },
      { text: 'Uniform', href: '/admission/uniform' },
      { text: 'Rules & Regulations', href: '/admission/rules' },
    ]
  },
  {
    text: 'Achievements',
    href: '/achievements',
    children: [
      { text: 'Toppers', href: '/achievements/toppers' },
      { text: 'Other Achievements', href: '/achievements/other' },
    ]
  },
  {
    text: 'Gallery',
    href: '/gallery',
  },
  {
    text: 'Notifications',
    href: '/notifications',
  },
  {
    text: 'Contact',
    href: '/contact',
  },
]

// Homepage Hero
export const heroSection: HeroSection = {
  title: 'Welcome to Sacred Heart Senior Secondary School',
  subtitle: 'Where Education Meets Values - Nurturing young minds since 1969',
  ctaText: 'Apply for Admission',
  ctaLink: '/admission',
}

// Homepage Hero Slideshow Images
export const heroImages = [
  '/images/Homepage/Hero_First.webp',
  '/images/Homepage/Hero_1.webp',
  '/images/Homepage/Hero_2.webp',
  '/images/Homepage/Hero_3.webp',
  '/images/Homepage/Hero_4.webp',
  '/images/Homepage/Hero_5.webp',
  '/images/Homepage/Hero_6.webp',
  '/images/Homepage/Hero_7.webp',

]

// Homepage Statistics
export const statistics: Stat[] = [
  { label: 'Glorious Years', value: '56', suffix: '+' },
  { label: 'Teacher Strength', value: '112', suffix: '+' },
  { label: 'Students Strength', value: '2.6K', suffix: '+' },
  { label: 'Library Books', value: '9K', suffix: '+' },
]

// Quick Links
export const quickLinks: QuickLink[] = [
  { title: 'Register Interest', href: '/admission/register', icon: 'FileText' },
  { title: 'Fee Structure', href: '/admission/fee-structure', icon: 'CreditCard' },
  { title: 'Academic Calendar', href: '/academics/calendar', icon: 'Calendar' },
]

// Staff Directory
export const staffMembers: StaffMember[] = [
  { id: '1', name: 'Sr. Archana', role: 'Principal', department: 'Administration', qualifications: '' },
  { id: '2', name: 'POOJA SONI', role: 'Teacher', department: 'English', qualifications: 'MA ENGLISH, B.ED' },
  { id: '3', name: 'ANSHU SHAROTRI', role: 'Teacher', department: 'Science', qualifications: 'M.SC CHEMISTRY, B.ED' },
  { id: '4', name: 'RANJAN DIXIT', role: 'Teacher', department: '', qualifications: 'M.PHIL' },
  { id: '5', name: 'DOLLY THAKUR', role: 'Teacher', department: 'Mathematics', qualifications: 'M.SC MATH' },
  { id: '6', name: 'AARTI SHARMA', role: 'Teacher', department: 'English', qualifications: 'M.A ENGLISH, B.ED' },
  { id: '7', name: 'ASHISH MAHAJAN', role: 'Teacher', department: 'Commerce', qualifications: 'B.SC, COMMERCE, B.ED' },
  { id: '8', name: 'LALIT SOOD', role: 'Teacher', department: 'Science', qualifications: 'M.SC CHEMISTRY, B.ED' },
  { id: '9', name: 'SHAILJA CHAUHAN', role: 'Teacher', department: 'Science', qualifications: 'M.SC BOTANY, B.ED' },
  { id: '10', name: 'ARCHANA SAPEHYA', role: 'Teacher', department: 'Science', qualifications: 'B.SC, B.ED' },
  { id: '11', name: 'NITIKA SHARMA', role: 'Teacher', department: 'Science', qualifications: 'M.SC, B.ED' },
  { id: '12', name: 'MONA SOOD', role: 'Teacher', department: 'Science', qualifications: 'M.SC CHEMISTRY, B.ED' },
  { id: '13', name: 'NEHA SAMUEL', role: 'Teacher', department: 'Science', qualifications: 'M.SC, B.ED' },
  { id: '14', name: 'SHILPI WALIA', role: 'Teacher', department: 'English', qualifications: 'M.A ENGLISH , B. ED' },
  { id: '15', name: 'ANUPAMA', role: 'Teacher', department: 'Commerce', qualifications: 'M.COM. , B.ED.' },
  { id: '16', name: 'RAJ KUMAR SHARMA', role: 'Teacher', department: 'Computer Science', qualifications: 'M.SC IT, M.CA' },
  { id: '17', name: 'SAKSHI SHARMA', role: 'Teacher', department: 'English', qualifications: 'M.A ENGLISH , B.ED' },
  { id: '18', name: 'HIMANI MISHRA', role: 'Teacher', department: 'Mathematics', qualifications: 'M.SC MATH, B.ED' },
  { id: '19', name: 'SUMITA CHAKRABARTI SEN', role: 'Teacher', department: 'English', qualifications: 'M.A ENGLISH, B.ED, M.ED' },
  { id: '20', name: 'RENU INDORIA', role: 'Teacher', department: 'Computer Science', qualifications: 'M.SC IT, M.C.A, B.ED' },
  { id: '21', name: 'NIVEDITA CHOPRA', role: 'Teacher', department: '', qualifications: 'M.TECH' },
  { id: '22', name: 'ANKUSH KUMAR', role: 'Lab Assistant', department: '', qualifications: 'B.A, DCA' },
  { id: '23', name: 'ANAMIKA GUPTA', role: 'Teacher', department: 'Mathematics', qualifications: 'M.SC MATH, B.ED' },
  { id: '24', name: 'SHALINI KATOCH', role: 'Teacher', department: 'English', qualifications: 'M.A ENGLISH, B.SC, B.ED' },
  { id: '25', name: 'SUREKHA CHIB', role: 'Teacher', department: 'Commerce', qualifications: 'B.COM, B.ED' },
  { id: '26', name: 'ANUPA ARORA', role: 'Teacher', department: 'Hindi', qualifications: 'M.A HINDI, B.ED' },
  { id: '27', name: 'GOLDY PARMAR', role: 'Teacher', department: 'Mathematics', qualifications: 'M.SC MATH, B.ED' },
  { id: '28', name: 'NIDHI THAKUR', role: 'Teacher', department: 'Science', qualifications: 'B.SC, M.SC, PGDCA, B.ED' },
  { id: '29', name: 'CHANDER KIRAN', role: 'Teacher', department: '', qualifications: 'M.A PUBLIC ADMINISTRATION, B.ED' },
  { id: '30', name: 'ROHITA CHETTRI', role: 'Teacher', department: '', qualifications: 'B.A, B.ED' },
  { id: '31', name: 'DR. SUDHA THAPA', role: 'Teacher', department: 'Geography', qualifications: 'M.A , B.ED, P.HD GEOGRAPHY' },
  { id: '32', name: 'SANGEETA SHARMA', role: 'Teacher', department: '', qualifications: 'B.A SHASTRI' },
  { id: '33', name: 'RITU BALA', role: 'Teacher (Art & Craft)', department: 'Art', qualifications: 'ART AND CRAFT DIPLOMA OF 2 YEARS' },
  { id: '34', name: 'MANISHA GURUNG', role: 'Receptionist', department: 'Office Staff', qualifications: 'B.A, M.A' },
  { id: '35', name: 'AMITA MISHRA', role: 'Clerk', department: 'Office Staff', qualifications: 'B.COM, DIPLOMA IN INFORMATION TECHNOLOGY' },
  { id: '36', name: 'ANITA KUMARI', role: 'Teacher (Sports)', department: 'Physical Education', qualifications: 'B.A ARTS, M.A, B.PED' },
  { id: '37', name: 'SUNITA DEVI', role: 'Teacher', department: 'Commerce', qualifications: 'M.COM, B.ED' },
  { id: '38', name: 'KAVITA SHARMA', role: 'Teacher', department: 'Science', qualifications: 'M.BOTONY, B.ED' },
  { id: '39', name: 'SONIKA ACHARYA', role: 'Teacher', department: '', qualifications: 'M.A, B.ED' },
  { id: '40', name: 'MONIKA VYAS', role: 'Teacher', department: 'English', qualifications: 'M.A ENGLISH, B.ED, B.SC' },
  { id: '41', name: 'SUNIL KUMAR', role: 'IT Staff', department: 'Office Staff', qualifications: 'B.SC IT' },
  { id: '42', name: 'AMANDEEP', role: 'Teacher', department: '', qualifications: 'M.A, M.ED' },
  { id: '43', name: 'SHALU RANA', role: 'Teacher', department: '', qualifications: 'M.A, B.ED' },
  { id: '44', name: 'PARUL RANA', role: 'Teacher', department: 'English', qualifications: 'M.A ENGLISH, B.ED' },
  { id: '45', name: 'RUCHI GROVER', role: 'Teacher', department: 'English', qualifications: 'M.A ENGLISH, BED' },
  { id: '46', name: 'AMIT WALIA', role: 'Teacher', department: 'Science', qualifications: 'M.SC, B.ED' },
  { id: '47', name: 'RICHA SHARMA', role: 'Teacher', department: 'Science', qualifications: 'B.SC, B.ED' },
  { id: '48', name: 'SHILPA', role: 'Teacher', department: '', qualifications: 'B.ED, M.ED' },
  { id: '49', name: 'MONIKA RANI', role: 'Teacher', department: '', qualifications: 'M.A, M.ED' },
  { id: '50', name: 'RENU MANHAS', role: 'Teacher', department: '', qualifications: 'B.CA, M.BA' },
  { id: '51', name: 'POOJA VASHISTH', role: 'Teacher', department: '', qualifications: 'B.A, M.A' },
  { id: '52', name: 'JYOTI BHARDWAJ', role: 'Teacher', department: '', qualifications: 'M.A, B.ED' },
  { id: '53', name: 'NAGESH THAKUR', role: 'Teacher', department: 'Science', qualifications: 'M.SC, M.ED' },
  { id: '54', name: 'SHANTIRANI HASDA', role: 'Teacher (Dance)', department: 'Cultural', qualifications: 'M.A, DANCE' },
  { id: '55', name: 'AMIT KUMAR', role: 'Librarian', department: 'Library', qualifications: 'POST GRADUATION (DIPLOMA IN LIBRARY SCIENCE)' },
  { id: '56', name: 'GULSHAN KUMAR', role: 'IT Staff', department: 'Office Staff', qualifications: 'BCA, (PROGRAMMING LANGUAGES)' },
  { id: '57', name: 'RUCHIKA SHARMA', role: 'Teacher', department: '', qualifications: 'M.A, M.ED' },
  { id: '58', name: 'ANNU GULERIA', role: 'Teacher', department: 'Science', qualifications: 'B.SC, B.ED' },
  { id: '59', name: 'ABKASHIKA SHARMA', role: 'Teacher', department: '', qualifications: 'M.A, B.ED' },
  { id: '60', name: 'BALVINDER SINGH', role: 'Teacher (Sports)', department: 'Physical Education', qualifications: 'B.A, B.P.ED, M.P.ED' },
  { id: '61', name: 'POOJA SHARMA', role: 'Teacher', department: '', qualifications: 'B.A, M.A, B.ED' },
  { id: '62', name: 'SONIA SHARMA', role: 'Teacher', department: 'Hindi', qualifications: 'B.A, M.A, M.PHILL, PH.D' },
  { id: '63', name: 'CHANDER REKHA', role: 'Teacher', department: '', qualifications: 'B.A, M.A, M.PHILL, B.ED' },
  { id: '64', name: 'AARTI SHARMA', role: 'Teacher', department: 'Science', qualifications: 'B.SC, M.SC, B.ED' },
  { id: '65', name: 'JAISHREE KASHYAP', role: 'Teacher', department: '', qualifications: 'B.BA, M.BA, B.ED' },
  { id: '66', name: 'PRASHANT SHARMA', role: 'Teacher', department: 'Science', qualifications: 'B.SC, M.SC, B.ED' },
  { id: '67', name: 'SHILPA', role: 'Teacher', department: 'Science', qualifications: 'M.SC, B.ED' },
  { id: '68', name: 'VARSHA GURUNG', role: 'Teacher', department: '', qualifications: 'M.A, B.ED' },
  { id: '69', name: 'RASHIM', role: 'Teacher', department: '', qualifications: 'M.A, B.ED' },
  { id: '70', name: 'AKRITI SHARMA', role: 'Teacher', department: 'Science', qualifications: 'B.SC, M.SC, B.ED' },
  { id: '71', name: 'POOJA VASHISHT', role: 'Teacher', department: '', qualifications: 'B.A, M.A, B.ED' },
  { id: '72', name: 'RISHTA GURUNG', role: 'Teacher', department: '', qualifications: 'B.A, B.ED, H.P TET' },
  { id: '73', name: 'DALJIT KAUR', role: 'Teacher', department: 'English', qualifications: 'M.A ENGLIS, B.ED' },
  { id: '74', name: 'KOMAL GULERIA', role: 'Teacher', department: 'Commerce', qualifications: 'M.COM, B.ED' },
  { id: '75', name: 'VANDANA BARWAL', role: 'Teacher', department: 'English', qualifications: 'B.A, M.A ENGLISH, B.ED' },
  { id: '76', name: 'PALAK WALIA', role: 'Teacher', department: 'Science', qualifications: 'B.SC ZOLOGY, M.SC ZOLOGY, B.ED' },
  { id: '77', name: 'VANDNA VERMA', role: 'Teacher', department: 'Commerce', qualifications: 'B.COM, M.COM, B.ED' },
  { id: '78', name: 'BHARTI BHATLI', role: 'Teacher', department: '', qualifications: 'B.A, M.A, NTT' },
  { id: '79', name: 'AMBIKA DHIMAN', role: 'Nurse', department: 'Office Staff', qualifications: 'B.SC NUESING' },
  { id: '80', name: 'KAVESH CHAUHAN', role: 'Teacher (Sports)', department: 'Physical Education', qualifications: 'B.SC, B.P.ED, PGDSC (NIS)' },
  { id: '81', name: 'RISHI KUMSR', role: 'Teacher (Music)', department: 'Music', qualifications: 'B.A, M.A, D.EL.ED' },
  { id: '82', name: 'MAHINDER SINGH CHOUDHARY', role: 'Teacher (Sports)', department: 'Physical Education', qualifications: 'B.A, B.P.E, BP.ED' },
  { id: '83', name: 'MEENAKSHI SHARMA', role: 'Teacher', department: 'Science', qualifications: 'B.SC, M.SC, B.ED' },
  { id: '84', name: 'SWATI RANA', role: 'Teacher', department: '', qualifications: 'B.A, M.A, B.ED' },
  { id: '85', name: 'DR. JYOTI BHARDWAJ', role: 'Teacher', department: 'Science', qualifications: 'B.SC, M.SC, B.ED' },
  { id: '86', name: 'ARCHITA MEHTA', role: 'Teacher', department: '', qualifications: 'B.SC, M.A, B.ED' },
  { id: '87', name: 'ABHINANDAN SHARMA', role: 'Teacher', department: '', qualifications: 'B.A, M.A, B.ED' },
  { id: '88', name: 'DEEPIKA SHARMA', role: 'Teacher', department: 'Computer Science', qualifications: 'BCA, MCA' },
  { id: '89', name: 'DEEPALI KATOCH', role: 'Teacher', department: 'Science', qualifications: 'B.SC, M.SC, B.ED' },
  { id: '90', name: 'BHARTI ATTRI', role: 'Teacher', department: '', qualifications: 'B.SC, M.A, B.ED' },
  { id: '91', name: 'JAGTAR SINGH', role: 'Teacher (Sports)', department: 'Physical Education', qualifications: 'B.PE, M.PED' },
  { id: '92', name: 'SHIVANI KUMARI', role: 'Teacher (Art & Craft)', department: 'Art', qualifications: 'B.A, M.A' },
]

// Student Leaders
export const studentLeaders: StudentLeader[] = [
  {
    id: '1',
    name: 'Vijit Veer Chaudhary',
    role: 'Head Boy',
    initials: 'HB',
    year: '2025-26',
    message: 'I am honored to serve as the Head Boy of this outstanding institution. This school has gifted me joyful and unforgettable memories.',
  },
  {
    id: '2',
    name: 'Gurnoor Kaur',
    role: 'Head Girl',
    initials: 'HG',
    year: '2025-26',
    message: 'Sacred Heart is a place where my heart grew roots, my spirit took flight.',
  },
]

// Office Bearers
export const officeBearers: OfficeBearerSession[] = [
  {
    year: '2025',
    headGirl: 'Gurnoor Kaur XII A',
    headBoy: 'Vijit Veer Chaudhary XII A',
    gamesCaptainGirls: 'Astha Sharma XII B',
    gamesViceCaptainGirls: 'Aanandi Nag XI A',
    gamesCaptainBoys: 'Rishit Sapahiya XII A',
    gamesViceCaptainBoys: 'Varnika Thakur X C',
    editorsInChief: 'Aditi Awasthi XII A, Gurnoor Kaur XI A',
    houseCaptains: [
      { house: 'Eagles', captain: 'Agrani Sharma IX C', viceCaptain: 'Nandini Thakur X B' },
      { house: 'Pelicans', captain: 'Arshia Singh X C', viceCaptain: 'Samiya Pathania X D' },
      { house: 'Pioneers', captain: 'Nadav Mishra IX B', viceCaptain: 'Sharanya Gautam IX C' },
      { house: 'Trekkers', captain: 'Mudit Thakur X A', viceCaptain: 'Mehul Dhiman XI C' },
    ],
    prefects: [
      { names: 'Varada Sharma X D, Kayna Gupta X A', house: 'Eagles' },
      { names: 'Amaira Chopra X B, Shreyan Anand X B', house: 'Pelicans' },
      { names: 'Nishkarsh Mahajan X D, Akshaj Sharma X D', house: 'Pioneers' },
      { names: 'Gurnoor Kaur Chhina X A, Soham Sharma X C', house: 'Trekkers' },
    ],
  },
  {
    year: '2024',
    headGirl: 'Swapi XII B',
    headBoy: 'Pratyush Kashyap XII A',
    gamesCaptainGirls: 'Muhani Sihmar XII B',
    gamesViceCaptainGirls: 'Astha Sharma XI B',
    gamesCaptainBoys: 'Anmol Vashisht XII A',
    gamesViceCaptainBoys: 'Atishwar Walia XI A',
    editorsInChief: 'Aditi Awasthi XII A, Gurnoor Kaur XI A',
    houseCaptains: [
      { house: 'Eagles', captain: 'Nishtha Chandra X D', viceCaptain: 'Swarit Sharma IX A' },
      { house: 'Pelicans', captain: 'Shaurya Bhardwaj X C', viceCaptain: 'Aarna IX C' },
      { house: 'Pioneers', captain: 'Vanika Sharma X B', viceCaptain: 'Pranya Dogra IX A' },
      { house: 'Trekkers', captain: 'Harsh Vardhan X C', viceCaptain: 'Shagun Rana IX C' },
    ],
    prefects: [
      { names: 'Varada Sharma X D, Kayna Gupta X A', house: 'Eagles' },
      { names: 'Amaira Chopra X B, Shreyan Anand X B', house: 'Pelicans' },
      { names: 'Nishkarsh Mahajan X D, Akshaj Sharma X D', house: 'Pioneers' },
      { names: 'Gurnoor Kaur Chhina X A, Soham Sharma X C', house: 'Trekkers' },
    ],
  },
  {
    year: '2023',
    headGirl: 'Akshima Jaggi XII B',
    headBoy: 'Nimish Naveen Chaudhary XII B',
    gamesCaptainGirls: 'Mahika XII B',
    gamesViceCaptainGirls: 'Ishita Narotra X B',
    gamesCaptainBoys: 'Aryan Chaudhary XII A',
    gamesViceCaptainBoys: 'Mahir Thapa X A',
    editorsInChief: '',
    houseCaptains: [
      { house: 'Eagles', captain: 'Shauryavardhan Minhas X B', viceCaptain: 'Nandika Bhardwaj IX A' },
      { house: 'Pelicans', captain: 'Rabnoor Kaur X A', viceCaptain: 'Rudransh Spehia IX A' },
      { house: 'Pioneers', captain: 'Aditya Randhawa X D', viceCaptain: 'Sneha Rani IX D' },
      { house: 'Trekkers', captain: 'Riya Dewan X B', viceCaptain: 'Vaibhav Thakur IX D' },
    ],
    prefects: [
      { names: 'Varada Sharma X D, Kayna Gupta X A', house: 'Eagles' },
      { names: 'Amaira Chopra X B, Shreyan Anand X B', house: 'Pelicans' },
      { names: 'Nishkarsh Mahajan X D, Akshaj Sharma X D', house: 'Pioneers' },
      { names: 'Gurnoor Kaur Chhina X A, Soham Sharma X C', house: 'Trekkers' },
    ],
    juniorCaptains: [
      { captain: 'Swastik Sharma VI D', viceCaptain: 'Erika Gupta V D', house: 'Lotus' },
      { captain: 'Abhirav Sharma VI C', viceCaptain: 'Prakarshi Choudhary V A', house: 'Pansy' },
      { captain: 'Shanaya Walia VI A', viceCaptain: 'Aariv Katoch V C', house: 'Rose' },
      { captain: 'Aaradhya Thapa VI B', viceCaptain: 'Sheril Soni V C', house: 'Shamrock' },
    ],
  },
]

// Achievements
export const achievements: Achievement[] = [
  {
    id: '1',
    title: 'Chandrayaan-3 Mission',
    description: 'Rajat Awasthi, alumnus (2004), part of the successful Chandrayaan-3 mission, making the institution and every Indian proud.',
    year: 2023,
    studentName: 'Rajat Awasthi',
    category: 'academic',
  },
  {
    id: '2',
    title: '100% Pass Result',
    description: 'All students passed with flying colors in CISCE Board Examinations.',
    year: 2024,
    category: 'academic',
  },
  {
    id: '3',
    title: 'Sports Championship',
    description: 'Won inter-school sports championship for consecutive years.',
    year: 2024,
    category: 'sports',
  },
  {
    id: '4',
    title: 'Cultural Excellence',
    description: 'Outstanding performance in various cultural competitions at district and state level.',
    year: 2024,
    category: 'cultural',
  },
]

// Gallery Images
export const galleryImages: GalleryImage[] = [
  // Events and activities from scraped images
]

// Facilities
export const facilities: Facility[] = [
  { id: '1', name: 'Smart Classrooms', icon: 'Monitor', description: 'Interactive digital learning with modern technology' },
  { id: '2', name: 'Computer Lab', icon: 'Laptop', description: 'Well-equipped computer lab with internet access' },
  { id: '3', name: 'Science Lab', icon: 'FlaskConical', description: 'Modern science laboratories for practical learning' },
  { id: '4', name: 'Library', icon: 'Library', description: 'Well-stocked library with digital resources' },
  { id: '5', name: 'Sports Ground', icon: 'Trophy', description: 'Spacious playground for various sports activities' },
  { id: '6', name: 'Meditation Hall', icon: 'Flower2', description: 'Dedicated space for spiritual development' },
  { id: '7', name: 'Transport Facility', icon: 'Bus', description: 'Safe transportation for students' },
  { id: '8', name: 'Medical Facility', icon: 'Stethoscope', description: 'On-campus medical assistance available' },
]

// Notifications
export const notifications: Notification[] = [
  {
    id: '1',
    title: 'Rules for issuing duplicate documents',
    description: 'Rules for issuing duplicate documents, correction of name, date of birth, verification of documents, and other relevant procedures.',
    date: '2025-05',
    important: true,
  },
  {
    id: '2',
    title: 'ACTIVE CISCE Initiative',
    description: 'Introducing ACTIVE CISCE - A holistic initiative for student health, fitness, and talent nurturing.',
    date: '2025-04',
    important: true,
  },
  {
    id: '3',
    title: 'XI Class Admission',
    description: 'Information Regarding XI Class Admission.',
    date: '2025-04',
    important: true,
  },
]

// Principal's Message
export const principalMessage = `Welcome to the Sacred Heart school website. The purpose of this website is to provide parents, students, and our school community with easy access to a wealth of information on our school programs, policies and activities.

Sacred Heart school is a great place to teach and learn. Our teachers are committed to a high-quality learning experience focused on the individual needs of each child. We are striving to be creative and innovative in our instruction to engage students in their learning through a variety of activities, applications of technology and 21st century skills.

Education aims at a holistic and integral development of a student/person. It is a collective responsibility based on a deep and healthy relationship between teachers, students, parents and among students themselves. We try to connect our deep relationship with the creator, God almighty to achieve our dreams and goals.`

// School History
export const schoolHistory = `Sacred Heart Senior Secondary School at Sidhpur in Dharamshala is owned and run by the congregation of Sisters of Charity of Jesus and Mary, founded by Fr. Peter Joseph Triest in Belgium, in 1803 and established in India, at Dalhousie in 1901. The congregation is missioned to reveal that God is love. It values the educational Apostolate of helping individuals to discover their dignity as human persons and children of God.

In the aftermath of Indo-Pak war in 1965, some military officials contacted the then provincial superior of Delhi province in Amritsar asking for sisters to take over the Garrison school in Yol Camp. Amritsar and Dalhousie were already well established hub of educational apostolic work of Sisters of Charity.

On 26th August 1966, five sisters arrived at Yol camp and were the first organizers of the place with Sr. Corneliana Heemskeek at the helm of the new foundation. By January 1967 the Primary Garrison School running in six military bungalows with 150 students was renamed Sacred Heart Garrison School. It was to be a Middle school till grade 7. Slowly and gradually the school began to develop and it got a future impetus with the arrival of 4th Mountain Division of the army, under the command of Maj. General Rai, the number of students rose to 300. Soon the lack of space for the growing numbers and the transport problem, there was dire need to acquire land to build. Fr. Dominic Perumpanani the chaplain of Yol helped Mother Corneliana to find a new location between Dharamshala and Yol. Finally 16.52 acres was bought, of most ideally situated land in a hill country, full of natural beauty that lay along the main road. In Feb, 1968 Mother Philip Murphy arrived as superior. In 1969, the ground floor was ready under the able guidance of architect and contractor Sardar Dharam Singh. Classes were started at Sidhpur but sisters returned to their convent daily.

A convent and a school at Sidhpur. Mother Philip and her Sisters wanted to work together on the same site so, their request was accepted by the provincial team. In March 1970, the late Dr. Y.S Parmar, the then Chief Minister of H.P. came formally to inaugurate the Sacred Heart High School, Sidhpur. From then on wards there was no coming back and the school has grown by leaps and bounds.`

// School Mission
export const schoolMission = `The Congregation values the educational Apostolate of helping individuals to discover their dignity as human persons and children of God. To bring about a society based on love, justice and peace is one of the most important aspect of this mission.`

// Pass Out Batch Years
export const batchYears = [
  1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1981, 1982, 1984, 1985, 1986, 1989,
  1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003,
  2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2020,
  2021, 2022, 2023, 2024
]

// Batch Photos - X = Class 10, XII = Class 12
export const batchPhotos: BatchYear[] = [
  { year: 1972, photos: [{ id: '1972-1', year: 1972, title: 'Class of 1972', image: '/images/Students/Pass Out Batches/1972.webp' }] },
  { year: 1973, photos: [{ id: '1973-1', year: 1973, title: 'Class of 1973', image: '/images/Students/Pass Out Batches/1973.webp' }] },
  { year: 1974, photos: [{ id: '1974-1', year: 1974, title: 'Class of 1974', image: '/images/Students/Pass Out Batches/1974.webp' }] },
  { year: 1975, photos: [{ id: '1975-1', year: 1975, title: 'Class of 1975', image: '/images/Students/Pass Out Batches/1975.webp' }] },
  { year: 1976, photos: [{ id: '1976-1', year: 1976, title: 'Class of 1976', image: '/images/Students/Pass Out Batches/1976.webp' }] },
  { year: 1977, photos: [{ id: '1977-1', year: 1977, title: 'Class of 1977', image: '/images/Students/Pass Out Batches/1977.webp' }] },
  { year: 1978, photos: [{ id: '1978-1', year: 1978, title: 'Class of 1978', image: '/images/Students/Pass Out Batches/1978.webp' }] },
  { year: 1979, photos: [{ id: '1979-1', year: 1979, title: 'Class of 1979', image: '/images/Students/Pass Out Batches/1979.webp' }] },
  { year: 1981, photos: [{ id: '1981-1', year: 1981, title: 'Class of 1981', image: '/images/Students/Pass Out Batches/1981.webp' }] },
  { year: 1982, photos: [{ id: '1982-1', year: 1982, title: 'Class of 1982', image: '/images/Students/Pass Out Batches/1982.webp' }] },
  { year: 1984, photos: [{ id: '1984-1', year: 1984, title: 'Class of 1984', image: '/images/Students/Pass Out Batches/1984.webp' }] },
  { year: 1985, photos: [{ id: '1985-1', year: 1985, title: 'Class of 1985', image: '/images/Students/Pass Out Batches/1985.webp' }] },
  { year: 1986, photos: [{ id: '1986-1', year: 1986, title: 'Class of 1986', image: '/images/Students/Pass Out Batches/1986.webp' }] },
  { year: 1989, photos: [{ id: '1989-1', year: 1989, title: 'Class of 1989', image: '/images/Students/Pass Out Batches/1989.webp' }] },
  { year: 1990, photos: [{ id: '1990-1', year: 1990, title: 'Class of 1990', image: '/images/Students/Pass Out Batches/1990.webp' }] },
  { year: 1991, photos: [{ id: '1991-1', year: 1991, title: 'Class of 1991', image: '/images/Students/Pass Out Batches/1991.webp' }] },
  { year: 1992, photos: [{ id: '1992-1', year: 1992, title: 'Class of 1992', image: '/images/Students/Pass Out Batches/1992.webp' }] },
  { year: 1993, photos: [{ id: '1993-1', year: 1993, title: 'Class of 1993', image: '/images/Students/Pass Out Batches/1993.webp' }] },
  { year: 1994, photos: [{ id: '1994-1', year: 1994, title: 'Class of 1994', image: '/images/Students/Pass Out Batches/1994.webp' }] },
  { year: 1995, photos: [{ id: '1995-1', year: 1995, title: 'Class of 1995', image: '/images/Students/Pass Out Batches/1995.webp' }] },
  { year: 1996, photos: [{ id: '1996-1', year: 1996, title: 'Class of 1996', image: '/images/Students/Pass Out Batches/1996.webp' }] },
  { year: 1997, photos: [{ id: '1997-1', year: 1997, title: 'Class of 1997', image: '/images/Students/Pass Out Batches/1997.webp' }] },
  { year: 1998, photos: [{ id: '1998-1', year: 1998, title: 'Class of 1998', image: '/images/Students/Pass Out Batches/1998.webp' }] },
  { year: 1999, photos: [{ id: '1999-1', year: 1999, title: 'Class of 1999', image: '/images/Students/Pass Out Batches/1999.webp' }] },
  { year: 2000, photos: [
    { id: '2000-1', year: 2000, title: 'Class of 2000 - Part I', image: '/images/Students/Pass Out Batches/2000-i.webp' },
    { id: '2000-2', year: 2000, title: 'Class of 2000 - Part II', image: '/images/Students/Pass Out Batches/2000-ii.webp' },
  ]},
  { year: 2001, photos: [{ id: '2001-1', year: 2001, title: 'Class of 2001', image: '/images/Students/Pass Out Batches/2001.webp' }] },
  { year: 2002, photos: [{ id: '2002-1', year: 2002, title: 'Class of 2002', image: '/images/Students/Pass Out Batches/2002.webp' }] },
  { year: 2003, photos: [{ id: '2003-1', year: 2003, title: 'Class of 2003', image: '/images/Students/Pass Out Batches/2003.webp' }] },
  { year: 2004, photos: [
    { id: '2004-1', year: 2004, title: 'Class of 2004 - Part I', image: '/images/Students/Pass Out Batches/2004-i.webp' },
    { id: '2004-2', year: 2004, title: 'Class of 2004 - Part II', image: '/images/Students/Pass Out Batches/2004-ii.webp' },
  ]},
  { year: 2005, photos: [
    { id: '2005-1', year: 2005, title: 'Class X - Section A (2005)', image: '/images/Students/Pass Out Batches/2005 X-A.webp' },
    { id: '2005-2', year: 2005, title: 'Class X - Section B (2005)', image: '/images/Students/Pass Out Batches/2005 X-B.webp' },
  ]},
  { year: 2006, photos: [{ id: '2006-1', year: 2006, title: 'Class of 2006', image: '/images/Students/Pass Out Batches/2006.webp' }] },
  { year: 2007, photos: [{ id: '2007-1', year: 2007, title: 'Class of 2007', image: '/images/Students/Pass Out Batches/2007.webp' }] },
  { year: 2008, photos: [{ id: '2008-1', year: 2008, title: 'Class of 2008', image: '/images/Students/Pass Out Batches/2008.webp' }] },
  { year: 2009, photos: [{ id: '2009-1', year: 2009, title: 'Class of 2009', image: '/images/Students/Pass Out Batches/2009.webp' }] },
  { year: 2010, photos: [{ id: '2010-1', year: 2010, title: 'Class of 2010', image: '/images/Students/Pass Out Batches/2010.webp' }] },
  { year: 2011, photos: [{ id: '2011-1', year: 2011, title: 'Class of 2011', image: '/images/Students/Pass Out Batches/2011.webp' }] },
  { year: 2012, photos: [{ id: '2012-1', year: 2012, title: 'Class of 2012', image: '/images/Students/Pass Out Batches/2012.webp' }] },
  { year: 2013, photos: [{ id: '2013-1', year: 2013, title: 'Class of 2013', image: '/images/Students/Pass Out Batches/2013.webp' }] },
  { year: 2014, photos: [{ id: '2014-1', year: 2014, title: 'Class of 2014', image: '/images/Students/Pass Out Batches/2014.webp' }] },
  { year: 2015, photos: [
    { id: '2015-1', year: 2015, title: 'Class X (2015)', image: '/images/Students/Pass Out Batches/2015 X.webp' },
    { id: '2015-2', year: 2015, title: 'Class XII (2015)', image: '/images/Students/Pass Out Batches/2015 XII.webp' },
  ]},
  { year: 2016, photos: [
    { id: '2016-1', year: 2016, title: 'Class X (2016)', image: '/images/Students/Pass Out Batches/2016 X.webp' },
    { id: '2016-2', year: 2016, title: 'Class XII (2016)', image: '/images/Students/Pass Out Batches/2016 XII.webp' },
  ]},
  { year: 2020, photos: [
    { id: '2020-1', year: 2020, title: 'Class X - Section A (2020)', image: '/images/Students/Pass Out Batches/2020 X-A.webp' },
    { id: '2020-2', year: 2020, title: 'Class X - Section B (2020)', image: '/images/Students/Pass Out Batches/2020 X-B.webp' },
    { id: '2020-3', year: 2020, title: 'Class X - Section C (2020)', image: '/images/Students/Pass Out Batches/2020 X-C.webp' },
    { id: '2020-4', year: 2020, title: 'Class X - Section D (2020)', image: '/images/Students/Pass Out Batches/2020 X-D.webp' },
  ]},
  { year: 2021, photos: [
    { id: '2021-1', year: 2021, title: 'Class X - Section A (2021)', image: '/images/Students/Pass Out Batches/2021 X-A.webp' },
    { id: '2021-2', year: 2021, title: 'Class X - Section B (2021)', image: '/images/Students/Pass Out Batches/2021 X-B.webp' },
    { id: '2021-3', year: 2021, title: 'Class X - Section C (2021)', image: '/images/Students/Pass Out Batches/2021 X-C.webp' },
    { id: '2021-4', year: 2021, title: 'Class X - Section D (2021)', image: '/images/Students/Pass Out Batches/2021 X-D.webp' },
  ]},
  { year: 2022, photos: [
    { id: '2022-1', year: 2022, title: 'Class X - Section A (2022)', image: '/images/Students/Pass Out Batches/2022 X-A.webp' },
    { id: '2022-2', year: 2022, title: 'Class X - Section B (2022)', image: '/images/Students/Pass Out Batches/2022 X-B.webp' },
    { id: '2022-3', year: 2022, title: 'Class X - Section C (2022)', image: '/images/Students/Pass Out Batches/2022 X-C.webp' },
    { id: '2022-4', year: 2022, title: 'Class X - Section D (2022)', image: '/images/Students/Pass Out Batches/2022 X-D.webp' },
    { id: '2022-5', year: 2022, title: 'Class XII (2022)', image: '/images/Students/Pass Out Batches/2022 XII.webp' },
  ]},
  { year: 2023, photos: [
    { id: '2023-1', year: 2023, title: 'Class X - Sections A & B (2023)', image: '/images/Students/Pass Out Batches/2023 X - A and B.webp' },
    { id: '2023-2', year: 2023, title: 'Class X - Sections C & D (2023)', image: '/images/Students/Pass Out Batches/2023 X - C and D.webp' },
  ]},
  { year: 2024, photos: [
    { id: '2024-1', year: 2024, title: 'Class X - Sections A & B (2024)', image: '/images/Students/Pass Out Batches/2024 X-A and B.webp' },
    { id: '2024-2', year: 2024, title: 'Class X - Section A (2024)', image: '/images/Students/Pass Out Batches/2024 X-A.webp' },
    { id: '2024-3', year: 2024, title: 'Class X - Section B (2024)', image: '/images/Students/Pass Out Batches/2024 X-B.webp' },
    { id: '2024-4', year: 2024, title: 'Class X - Section C (2024)', image: '/images/Students/Pass Out Batches/2024 X-C.webp' },
    { id: '2024-5', year: 2024, title: 'Class X - Section D (2024)', image: '/images/Students/Pass Out Batches/2024 X-D.webp' },
  ]},
]

// School Anthem
export const schoolAnthem = `To Sacred heart we sing today,
The school we love so well,
And to everyone we say,
May happiness here dwell

To fill our lives with beauty,
To be charitable, good and true,
And to fulfil our duty,
Is the ideal we pursue.

To strive towards nobility,
To help all in dire need,
To bow in humility,
This shall be now our creed.

The days that we spend here,
So happy and care free,
Shall always be held dear,
And in our memories be.

We gladly gather here this day,
May our school for ever be,
And for this each day we pray,
May God grant, so it be.`