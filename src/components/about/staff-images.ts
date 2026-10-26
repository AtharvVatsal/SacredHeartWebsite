// Photo of each member of staff, by name (server-safe: also used to seed the CMS staff list)

export function getStaffImage(name: string, qualifications: string = ''): string {
  if (name === 'AARTI SHARMA') {
    if (qualifications.includes('M.A ENGLISH') || qualifications.includes('MA ENGLISH')) {
      return '/images/Staff/Aarti Sharma.webp'
    } else if (qualifications.includes('M.SC') || qualifications.includes('MSC')) {
      return '/images/Staff/Aarti Sharma (2).webp'
    }
  }
  
  if (name === 'SHILPA') {
    if (qualifications.includes('B.ED, M.ED')) {
      return '/images/Staff/Shilpa.webp'
    } else if (qualifications.includes('M.SC')) {
      return '/images/Staff/Shilpa (2).webp'
    }
  }
  
  const nameMap: Record<string, string> = {
    'SR. GRACY M.D': '/images/principal.webp',
    'POOJA SONI': '/images/Staff/Pooja Soni.webp',
    'ANSHU SHAROTRI': '/images/Staff/Anshu Sharotari.webp',
    'RANJAN DIXIT': '/images/Staff/Rajan Dixit.webp',
    'DOLLY THAKUR': '/images/Staff/Dolly Thakur.webp',
    'AARTI SHARMA': '/images/Staff/Aarti Sharma.webp',
    'ASHISH MAHAJAN': '/images/Staff/Ashish Mahajan.webp',
    'LALIT SOOD': '/images/Staff/Lalit Sood.webp',
    'SHAILJA CHAUHAN': '/images/Staff/Shailja Chauhan.webp',
    'ARCHANA SAPEHYA': '/images/Staff/Archana Sapehya.webp',
    'NITIKA SHARMA': '/images/Staff/Nitika Sharma.webp',
    'MONA SOOD': '/images/Staff/Mona Sood.webp',
    'NEHA SAMUEL': '/images/Staff/Neha Samuel.webp',
    'SHILPI WALIA': '/images/Staff/Shilpi Walia.webp',
    'ANUPAMA': '/images/Staff/Anupama.webp',
    'RAJ KUMAR SHARMA': '/images/Staff/Rajkumar Sharma.webp',
    'SAKSHI SHARMA': '/images/Staff/Sakshi Sharma.webp',
    'HIMANI MISHRA': '/images/Staff/Himani Mishra.webp',
    'SUMITA CHAKRABARTI SEN': '/images/Staff/Sumita Chakrabarti Sen.webp',
    'RENU INDORIA': '/images/Staff/Renu Indoria.webp',
    'NIVEDITA CHOPRA': '/images/Staff/Nivedita Chopra.webp',
    'ANKUSH KUMAR': '/images/Staff/Ankush Kumar.webp',
    'ANAMIKA GUPTA': '/images/Staff/Anamika Gupta.webp',
    'SHALINI KATOCH': '/images/Staff/Shalini Katoch.webp',
    'SUREKHA CHIB': '/images/Staff/Surekha Chib.webp',
    'ANUPA ARORA': '/images/Staff/Anupa Arora.webp',
    'GOLDY PARMAR': '/images/Staff/Goldy Parmar.webp',
    'NIDHI THAKUR': '/images/Staff/Nidhi Thakur.webp',
    'CHANDER KIRAN': '/images/Staff/Chander Kiran.webp',
    'ROHITA CHETTRI': '/images/Staff/Rohita Chettri.webp',
    'DR. SUDHA THAPA': '/images/Staff/Dr. Sudha Thapa.webp',
    'SANGEETA SHARMA': '/images/Staff/Sangeeta Sharma.webp',
    'RITU BALA': '/images/Staff/Ritu Bala.webp',
    'MANISHA GURUNG': '/images/Staff/Manisha Gurung.webp',
    'AMITA MISHRA': '/images/Staff/Amita Mishra.webp',
    'ANITA KUMARI': '/images/Staff/Anita Kumari.webp',
    'SUNITA DEVI': '/images/Staff/Sunita Devi.webp',
    'KAVITA SHARMA': '/images/Staff/Kavita Sharma.webp',
    'SONIKA ACHARYA': '/images/Staff/Sonika Acharya.webp',
    'MONIKA VYAS': '/images/Staff/Monika Vyas.webp',
    'SUNIL KUMAR': '/images/Staff/Sunil Kumar.webp',
    'AMANDEEP': '/images/Staff/Amandeep.webp',
    'SHALU RANA': '/images/Staff/Shalu Rana.webp',
    'PARUL RANA': '/images/Staff/Parul Rana.webp',
    'RUCHI GROVER': '/images/Staff/Ruchi Grover.webp',
    'AMIT WALIA': '/images/Staff/Amit Walia.webp',
    'RICHA SHARMA': '/images/Staff/Richa Sharma.webp',
    'SHILPA': '/images/Staff/Shilpa.webp',
    'MONIKA RANI': '/images/Staff/Monika Rani.webp',
    'RENU MANHAS': '/images/Staff/Renu Manhas.webp',
    'POOJA VASHISTH': '/images/Staff/Pooja Vashisht.webp',
    'JYOTI BHARDWAJ': '/images/Staff/Jyoti Bhardwaj.webp',
    'NAGESH THAKUR': '/images/Staff/Nagesh Thakur.webp',
    'SHANTIRANI HASDA': '/images/Staff/Shantirani Hasda.webp',
    'AMIT KUMAR': '/images/Staff/Amit Kumar.webp',
    'GULSHAN KUMAR': '/images/Staff/Gulshan Kumar.webp',
    'RUCHIKA SHARMA': '/images/Staff/Ruchika Sharma.webp',
    'ANNU GULERIA': '/images/Staff/Anu Guleria.webp',
    'ABKASHIKA SHARMA': '/images/Staff/Abkashika Sharma.webp',
    'BALVINDER SINGH': '/images/Staff/Balvinder Singh.webp',
    'POOJA SHARMA': '/images/Staff/Pooja Sharma.webp',
    'SONIA SHARMA': '/images/Staff/Sonia Sharma.webp',
    'CHANDER REKHA': '/images/Staff/Chander Rekha.webp',
    'JAISHREE KASHYAP': '/images/Staff/Jaishree Kashyap.webp',
    'PRASHANT SHARMA': '/images/Staff/Prashant Sharma.webp',
    'VARSHA GURUNG': '/images/Staff/Varsha Gurung.webp',
    'RASHIM': '/images/Staff/Rashmi.webp',
    'AKRITI SHARMA': '/images/Staff/Akriti Sharma.webp',
    'RISHTA GURUNG': '/images/Staff/Rishta Gurung.webp',
    'DALJIT KAUR': '/images/Staff/Daljit Kaur.webp',
    'KOMAL GULERIA': '/images/Staff/Komal Guleria.webp',
    'VANDANA BARWAL': '/images/Staff/Vandana Barwal.webp',
    'PALAK WALIA': '/images/Staff/Palak Walia.webp',
    'VANDNA VERMA': '/images/Staff/Vandana Verma.webp',
    'BHARTI BHATLI': '/images/Staff/Bharti Bhatli.webp',
    'AMBIKA DHIMAN': '/images/Staff/Ambika Dhiman.webp',
    'KAVESH CHAUHAN': '/images/Staff/Kavesh Chauhan.webp',
    'RISHI KUMSR': '/images/Staff/Rishi Kumar.webp',
    'MAHINDER SINGH CHOUDHARY': '/images/Staff/Mahinder Singh Choudhary.webp',
    'MEENAKSHI SHARMA': '/images/Staff/Meenakshi Sharma.webp',
    'SWATI RANA': '/images/Staff/Swati Rana.webp',
    'DR. JYOTI BHARDWAJ': '/images/Staff/Dr. Jyoti Bhardwaj.webp',
    'ARCHITA MEHTA': '/images/Staff/Archita Mehta.webp',
    'ABHINANDAN SHARMA': '/images/Staff/Abhinandan Sharma.webp',
    'DEEPIKA SHARMA': '/images/Staff/Deepika Sharma.webp',
    'DEEPALI KATOCH': '/images/Staff/Deepali Katoch.webp',
    'BHARTI ATTRI': '/images/Staff/Bharti Attri.webp',
    'JAGTAR SINGH': '/images/Staff/Jagtar Singh.webp',
    'SHIVANI KUMARI': '/images/Staff/Shivani Kumari.webp',
    'SONIKA SHARMA': '/images/Staff/Sonika Sharma.webp',
    'SHOBHA': '/images/Staff/Shobha.webp',
    'NANDNA': '/images/Staff/Nandna.webp',
    'KANCHAN KUMARI': '/images/Staff/Kanchan Kumari.webp',
  }
  return nameMap[name.toUpperCase()] || ''
}
