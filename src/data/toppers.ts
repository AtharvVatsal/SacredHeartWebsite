// Board exam toppers, per session. Source for /achievements and both topper pages.

export interface Topper {
  id: string
  name: string
  percentage: number
  image?: string
}

export interface TopperSession {
  year: string // e.g. '2024-25'
  folder: string
  toppers: Topper[]
}

export interface RankedTopper extends Topper {
  rank: number
}

// Highest percentage first; equal percentages share a rank (1, 1, 3, …)
export function rankToppers(toppers: Topper[]): RankedTopper[] {
  const sorted = [...toppers].sort((a, b) => b.percentage - a.percentage)
  return sorted.map(t => ({ ...t, rank: 1 + sorted.filter(o => o.percentage > t.percentage).length }))
}

export function ordinal(n: number) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

export const class10Sessions: TopperSession[] = [
  {
    year: '2024-25',
    folder: '24-25',
    toppers: [
      { id: '1', name: 'NANDIKA BHARDWAJ', percentage: 97.2, image: '/images/Students/Toppers/10th/24-25/Nandika.webp' },
      { id: '2', name: 'UDIT THAKUR', percentage: 97.2, image: '/images/Students/Toppers/10th/24-25/Udit.webp' },
      { id: '3', name: 'TWISHA RANA', percentage: 97, image: '/images/Students/Toppers/10th/24-25/Twisha.webp' },
      { id: '4', name: 'AMOLIK MISHRA', percentage: 97, image: '/images/Students/Toppers/10th/24-25/Amolik.webp' },
      { id: '5', name: 'AAHANA', percentage: 96.8, image: '/images/Students/Toppers/10th/24-25/Aahana.webp' },
      { id: '6', name: 'SHOURYA JARYAL', percentage: 96.4, image: '/images/Students/Toppers/10th/24-25/Shourya.webp' },
      { id: '7', name: 'ADITI MAHAJAN', percentage: 96, image: '/images/Students/Toppers/10th/24-25/Aditi.webp' },
      { id: '8', name: 'EERA SHARMA', percentage: 95.6, image: '/images/Students/Toppers/10th/24-25/Eera.webp' },
      { id: '9', name: 'AKSHIT PATIAL', percentage: 95.6, image: '/images/Students/Toppers/10th/24-25/Akshit.webp' },
      { id: '10', name: 'NISTHA CHANDRA', percentage: 95.5, image: '/images/Students/Toppers/10th/24-25/Nistha.webp' },
      { id: '11', name: 'SHAURYA BHARDWAJ', percentage: 95.3, image: '/images/Students/Toppers/10th/24-25/Shaurya.webp' },
      { id: '12', name: 'HIMAKSHI', percentage: 94.2, image: '/images/Students/Toppers/10th/24-25/Himakshi.webp' },
      { id: '13', name: 'MEHUL DHIMAN', percentage: 95, image: '/images/Students/Toppers/10th/24-25/Mehul.webp' },
      { id: '14', name: 'ANSHUMAN KUMAR', percentage: 93.8, image: '/images/Students/Toppers/10th/24-25/Anshuman.webp' },
      { id: '15', name: 'ARNAV KATOCH', percentage: 93.6, image: '/images/Students/Toppers/10th/24-25/Arnav.webp' },
      { id: '16', name: 'HARSHVARDHAN', percentage: 93.4, image: '/images/Students/Toppers/10th/24-25/Harshvardhan.webp' },
      { id: '17', name: 'SHYLA SHARMA', percentage: 93.2, image: '/images/Students/Toppers/10th/24-25/Shyla.webp' },
      { id: '18', name: 'RUDRANSH SAPEYA', percentage: 93.2, image: '/images/Students/Toppers/10th/24-25/Rudransh.webp' },
      { id: '19', name: 'ALISHA PATHANIA', percentage: 93, image: '/images/Students/Toppers/10th/24-25/Alisha.webp' },
      { id: '20', name: 'VANIKA SHARMA', percentage: 93, image: '/images/Students/Toppers/10th/24-25/Vanika.webp' },
      { id: '21', name: 'DEEPSHIKHA', percentage: 93, image: '/images/Students/Toppers/10th/24-25/Deepshika.webp' },
      { id: '22', name: 'SURBHI SHARMA', percentage: 93, image: '/images/Students/Toppers/10th/24-25/Surbhi.webp' },
      { id: '23', name: 'ARSHIYA THAKUR', percentage: 93, image: '/images/Students/Toppers/10th/24-25/Arshiya.webp' },
      { id: '24', name: 'ANAYA KANWAR', percentage: 92.8, image: '/images/Students/Toppers/10th/24-25/Anaya.webp' },
      { id: '25', name: 'KARTIK THAKUR', percentage: 92.8, image: '/images/Students/Toppers/10th/24-25/Kartik.webp' },
      { id: '26', name: 'RAJAT KUMAR', percentage: 92.8, image: '/images/Students/Toppers/10th/24-25/Rajat.webp' },
      { id: '27', name: 'KRITIKA GULERIA', percentage: 92.6, image: '/images/Students/Toppers/10th/24-25/Kritika.webp' },
      { id: '28', name: 'AANANDI NAG', percentage: 92.4, image: '/images/Students/Toppers/10th/24-25/Aanandi.webp' },
      { id: '29', name: 'SHAHI MARKER', percentage: 94.4, image: '/images/Students/Toppers/10th/24-25/Shahi.webp' },
      { id: '30', name: 'KANISHKA RAWAT', percentage: 92.4, image: '/images/Students/Toppers/10th/24-25/Kanishka.webp' },
      { id: '31', name: 'AASHI', percentage: 92.4, image: '/images/Students/Toppers/10th/24-25/Aashi.webp' },
      { id: '32', name: 'INAYAT SEHGAL', percentage: 92, image: '/images/Students/Toppers/10th/24-25/Inayat.webp' },
      { id: '33', name: 'ARNAV PARASHAR', percentage: 91.6, image: '/images/Students/Toppers/10th/24-25/ArnavParashar.webp' },
      { id: '34', name: 'AAYUSH GULERIA', percentage: 91.6, image: '/images/Students/Toppers/10th/24-25/Aayush.webp' },
      { id: '35', name: 'ISHAN', percentage: 91.4, image: '/images/Students/Toppers/10th/24-25/Ishan.webp' },
      { id: '36', name: 'RIHAM RAJ', percentage: 91.4, image: '/images/Students/Toppers/10th/24-25/Riham.webp' },
      { id: '37', name: 'ANAHITA BHASIN', percentage: 91.4, image: '/images/Students/Toppers/10th/24-25/Anahita.webp' },
      { id: '38', name: 'VANSH AJ THAKUR', percentage: 91.4, image: '/images/Students/Toppers/10th/24-25/Vanshaj.webp' },
      { id: '39', name: 'ADITYA MAHAJAN', percentage: 91.4, image: '/images/Students/Toppers/10th/24-25/Aditya.webp' },
      { id: '40', name: 'VANSHIKA GUPTA', percentage: 91.4, image: '/images/Students/Toppers/10th/24-25/Vanshika.webp' },
      { id: '41', name: 'ADWITA RANA', percentage: 91.2, image: '/images/Students/Toppers/10th/24-25/Adwita.webp' },
      { id: '42', name: 'AARAV SHARMA', percentage: 91.2, image: '/images/Students/Toppers/10th/24-25/Aarav.webp' },
      { id: '43', name: 'PARIBHASHA', percentage: 90.8, image: '/images/Students/Toppers/10th/24-25/Paribhasha.webp' },
      { id: '44', name: 'SPARSH CHAUDHARY', percentage: 90.8, image: '/images/Students/Toppers/10th/24-25/Sparsh.webp' },
      { id: '45', name: 'ANCHAL DHADWAL', percentage: 90.8, image: '/images/Students/Toppers/10th/24-25/Anchal.webp' },
      { id: '46', name: 'ALKSHENDRA DUTTA', percentage: 90.8, image: '/images/Students/Toppers/10th/24-25/Alkshendra.webp' },
      { id: '47', name: 'ARUSH SAMIYAL', percentage: 90.6, image: '/images/Students/Toppers/10th/24-25/Arush.webp' },
      { id: '48', name: 'AARAV ACHARYA', percentage: 90.6, image: '/images/Students/Toppers/10th/24-25/AaravAcharya.webp' },
      { id: '49', name: 'PRANAV NAIR', percentage: 90.6, image: '/images/Students/Toppers/10th/24-25/Pranav.webp' },
      { id: '50', name: 'VATSAL DOGRA', percentage: 90.4, image: '/images/Students/Toppers/10th/24-25/Vatsal.webp' },
      { id: '51', name: 'VIPUL', percentage: 90.4, image: '/images/Students/Toppers/10th/24-25/Vipul.webp' },
      { id: '52', name: 'AVNEET SINGH', percentage: 90.2, image: '/images/Students/Toppers/10th/24-25/Avneet.webp' },
      { id: '53', name: 'ANCHAL RANA', percentage: 90.1, image: '/images/Students/Toppers/10th/24-25/AnchalRana.webp' },
    ]
  },
  {
    year: '2023-24',
    folder: '23-24',
    toppers: [
      { id: '54', name: 'AAKARSH GUPTA', percentage: 97.8, image: '/images/Students/Toppers/10th/23-24/Aakarsh.webp' },
      { id: '55', name: 'AADIT DHIMAN', percentage: 95, image: '/images/Students/Toppers/10th/23-24/Aadit.webp' },
      { id: '56', name: 'AGRIMA DIXIT', percentage: 97.4, image: '/images/Students/Toppers/10th/23-24/Agrima.webp' },
      { id: '57', name: 'AKSHAJ SHARMA', percentage: 97.4, image: '/images/Students/Toppers/10th/23-24/Akshaj.webp' },
      { id: '58', name: 'ANANYA RANA', percentage: 96.4, image: '/images/Students/Toppers/10th/23-24/Ananya.webp' },
      { id: '59', name: 'ARICA SHARMA', percentage: 95.4, image: '/images/Students/Toppers/10th/23-24/Arica.webp' },
      { id: '60', name: 'ARYA BHANDARI', percentage: 97.2, image: '/images/Students/Toppers/10th/23-24/Arya.webp' },
      { id: '61', name: 'BHAVYA GAUTAM', percentage: 95, image: '/images/Students/Toppers/10th/23-24/Bhavya.webp' },
      { id: '62', name: 'DISHA KUMARI', percentage: 96.6, image: '/images/Students/Toppers/10th/23-24/Disha.webp' },
      { id: '63', name: 'DIVANSHI', percentage: 97.6, image: '/images/Students/Toppers/10th/23-24/Divanshi.webp' },
      { id: '64', name: 'KAYNA GUPTA', percentage: 95.8, image: '/images/Students/Toppers/10th/23-24/Kanya.webp' },
      { id: '65', name: 'MOHAMMED WAZID', percentage: 97, image: '/images/Students/Toppers/10th/23-24/Mohammed.webp' },
      { id: '66', name: 'NISHKARSH MAHAJAN', percentage: 96.4 },
      { id: '67', name: 'PRANJLI KAUSHAL', percentage: 95.4, image: '/images/Students/Toppers/10th/23-24/Pranjli.webp' },
      { id: '68', name: 'PRIYANI SHARMA', percentage: 95.8, image: '/images/Students/Toppers/10th/23-24/Priyani.webp' },
      { id: '69', name: 'RIDHIMA SHARMA', percentage: 96.2, image: '/images/Students/Toppers/10th/23-24/Ridhima.webp' },
      { id: '70', name: 'RITVIK GUPTA', percentage: 95.8, image: '/images/Students/Toppers/10th/23-24/Ritvik.webp' },
      { id: '71', name: 'RIYA DEWAN', percentage: 97.4, image: '/images/Students/Toppers/10th/23-24/Riya.webp' },
      { id: '72', name: 'SHREYAN ANAND', percentage: 95, image: '/images/Students/Toppers/10th/23-24/Shreyan.webp' },
      { id: '73', name: 'SIDHESHWAR DEWAN', percentage: 97.2, image: '/images/Students/Toppers/10th/23-24/Shidheshwar.webp' },
      { id: '74', name: 'VEDIKA', percentage: 95, image: '/images/Students/Toppers/10th/23-24/Vedika.webp' },
      { id: '75', name: 'VIJIT VEER CHAUDHARY', percentage: 95, image: '/images/Students/Toppers/10th/23-24/Vijit.webp' },
      { id: '76', name: 'KANISH KATOCH', percentage: 95, image: '/images/Students/Toppers/10th/23-24/Kanish.webp' },
    ]
  },
  {
    year: '2022-23',
    folder: '22-23',
    toppers: [
      { id: '77', name: 'AARAV PATHANI', percentage: 98.4, image: '/images/Students/Toppers/10th/22-23/Aarav.webp' },
      { id: '78', name: 'DRISHTI', percentage: 98.4, image: '/images/Students/Toppers/10th/22-23/Drishti.webp' },
      { id: '79', name: 'PRIAYANSHI', percentage: 97.2, image: '/images/Students/Toppers/10th/22-23/Priyanshi.webp' },
    ]
  },
]

export const class12Sessions: TopperSession[] = [
  {
    year: '2024-25',
    folder: '24-25',
    toppers: [
      { id: '1', name: 'PRIYANSHI', percentage: 98, image: '/images/Students/Toppers/12th/24-25/Priyanshi.webp' },
      { id: '2', name: 'KASHISH', percentage: 96, image: '/images/Students/Toppers/12th/24-25/Kashish.webp' },
      { id: '3', name: 'SHARAJ SHARMA', percentage: 95, image: '/images/Students/Toppers/12th/24-25/Sharaj.webp' },
      { id: '4', name: 'SHIVANG KHANKA', percentage: 95, image: '/images/Students/Toppers/12th/24-25/Shivang.webp' },
      { id: '5', name: 'ADITI AWASTHI', percentage: 94.5, image: '/images/Students/Toppers/12th/24-25/Aditi.webp' },
      { id: '6', name: 'ANANYA GAKHAR', percentage: 94, image: '/images/Students/Toppers/12th/24-25/Ananya.webp' },
      { id: '7', name: 'ABHAY KATOCH', percentage: 93.25, image: '/images/Students/Toppers/12th/24-25/Abhay.webp' },
      { id: '8', name: 'PRATYUSH KASHYAP', percentage: 93.25, image: '/images/Students/Toppers/12th/24-25/Pratyush.webp' },
      { id: '9', name: 'DEVANSHI', percentage: 92.5, image: '/images/Students/Toppers/12th/24-25/Devanshi.webp' },
      { id: '10', name: 'RAHUL VERMA', percentage: 92, image: '/images/Students/Toppers/12th/24-25/Rahul.webp' },
      { id: '11', name: 'SHANTAM VARDHAN', percentage: 92, image: '/images/Students/Toppers/12th/24-25/Shantam.webp' },
      { id: '12', name: 'PARUL ROHIT', percentage: 92, image: '/images/Students/Toppers/12th/24-25/Parul.webp' },
      { id: '13', name: 'SWASTIK SUKTA', percentage: 90.75, image: '/images/Students/Toppers/12th/24-25/Swastik.webp' },
      { id: '14', name: 'SHARA AGNIHOTRI', percentage: 90.5, image: '/images/Students/Toppers/12th/24-25/Shara.webp' },
      { id: '15', name: 'SHIVAM', percentage: 90.5, image: '/images/Students/Toppers/12th/24-25/Shivam.webp' },
      { id: '16', name: 'SWAPI', percentage: 90.5, image: '/images/Students/Toppers/12th/24-25/Swapi.webp' },
      { id: '17', name: 'PRATHANA SINGH', percentage: 94, image: '/images/Students/Toppers/12th/24-25/Prathana.webp' },
      { id: '18', name: 'ANIMESH', percentage: 90.5, image: '/images/Students/Toppers/12th/24-25/Animesh.webp' },
      { id: '19', name: 'PRATYUSH', percentage: 90, image: '/images/Students/Toppers/12th/24-25/Pratyush.webp' },
    ]
  },
  {
    year: '2023-24',
    folder: '23-24',
    toppers: [
      { id: '20', name: 'ASMITA NAROTRA', percentage: 91, image: '/images/Students/Toppers/12th/23-24/Asmita.webp' },
      { id: '21', name: 'SANCHIT SHARMA', percentage: 94, image: '/images/Students/Toppers/12th/23-24/Sanchit.webp' },
      { id: '22', name: 'SHREYA GULERIA', percentage: 94, image: '/images/Students/Toppers/12th/23-24/Shreya.webp' },
      { id: '23', name: 'AKSHIMA JAGGI', percentage: 95, image: '/images/Students/Toppers/12th/23-24/Akshima.webp' },
      { id: '24', name: 'AISHWARYA SINGH THAPA', percentage: 94, image: '/images/Students/Toppers/12th/23-24/Aishwarya.webp' },
      { id: '25', name: 'AADISH', percentage: 94, image: '/images/Students/Toppers/12th/23-24/Aadish.webp' },
      { id: '26', name: 'TRISHA KHAJURIA', percentage: 92, image: '/images/Students/Toppers/12th/23-24/Trisha.webp' },
      { id: '27', name: 'TULIP CHOUHAN', percentage: 91, image: '/images/Students/Toppers/12th/23-24/Tulip.webp' },
      { id: '28', name: 'SARTHAK SHARMA', percentage: 94, image: '/images/Students/Toppers/12th/23-24/Sarthak.webp' },
      { id: '29', name: 'SARANSH SACHIN THAPA', percentage: 96, image: '/images/Students/Toppers/12th/23-24/Saransh.webp' },
      { id: '30', name: 'NIMISH NAVEEN CHOUDHARY', percentage: 91, image: '/images/Students/Toppers/12th/23-24/Tnimish.webp' },
      { id: '31', name: 'KHUSHI BHOGAL', percentage: 90, image: '/images/Students/Toppers/12th/23-24/Khushi.webp' },
      { id: '32', name: 'SWASTIK BHARDWAJ', percentage: 91, image: '/images/Students/Toppers/12th/23-24/Swastik.webp' },
    ]
  },
  {
    year: '2022-23',
    folder: '22-23',
    toppers: [
      { id: '33', name: 'NISHESH', percentage: 97.2, image: '/images/Students/Toppers/12th/22-23/Nishesh.webp' },
      { id: '34', name: 'ARCHIE', percentage: 97.2, image: '/images/Students/Toppers/12th/22-23/Archie.webp' },
      { id: '35', name: 'SHREYAS SHARMA', percentage: 95, image: '/images/Students/Toppers/12th/22-23/Shreyas.webp' },
    ]
  },
]
