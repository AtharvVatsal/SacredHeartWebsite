// Content of the privacy page, shared by the page itself and the CMS migration (src/cms/seed).
// Icons are names from the approved set (src/cms/blocks/shared/icon-names.ts).
import { schoolInfo } from '@/data/school'
import type { IconName } from '@/cms/blocks/shared/icon-names'

export const privacySections: { icon: IconName; title: string; content: string }[] = [
  {
    icon: 'Shield',
    title: 'Information We Collect',
    content: `We collect information you provide directly to us, including:
    
• Personal Information: Name, date of birth, address, and contact details when you submit admission forms or contact us
• Academic Information: Student records, grades, attendance, and performance data
• Technical Information: IP address, browser type, and usage data when you visit our website
• Images and Media: Photos and videos taken during school events (with appropriate consent)`
  },
  {
    icon: 'Eye',
    title: 'How We Use Your Information',
    content: `We use the information we collect to:

• Process admissions and enrollment applications
• Communicate with parents and guardians about student progress
• Maintain academic records and reports
• Organize school events and activities
• Improve our website and services
• Comply with legal obligations and educational requirements`
  },
  {
    icon: 'Lock',
    title: 'Data Protection',
    content: `We take the security of your personal information seriously:

• We implement appropriate technical and organizational measures to protect your data
• Access to personal information is restricted to authorized personnel only
• Our staff undergo regular training on data protection practices
• We regularly review and update our security measures
• All digital records are stored in secure, password-protected systems`
  },
  {
    icon: 'Users',
    title: 'Information Sharing',
    content: `We do not sell, trade, or rent personal information to third parties. We may share information:

• With educational authorities as required by law (CISCE, State Education Department)
• With service providers who assist in our operations (under strict confidentiality)
• When required by law or to protect our rights
• With parent/guardian consent for student-related matters

All sharing is conducted in compliance with applicable data protection laws.`
  },
  {
    icon: 'FileText',
    title: 'Cookies and Website Usage',
    content: `Our website may use cookies to:

• Remember your preferences and settings
• Analyze website traffic and usage
• Provide personalized content where applicable

You can control cookie settings through your browser. Note that disabling cookies may affect some website functionality.`
  },
  {
    icon: 'Mail',
    title: 'Contact Us',
    content: `If you have questions about this Privacy Policy or wish to exercise your rights regarding your personal data, please contact us:

Sacred Heart Senior Secondary School
Sidhpur, Dharamshala
Himachal Pradesh - 176057

Email: ${schoolInfo.contact.emails.join(', ')}
Phone: ${schoolInfo.contact.phones.join(', ')}

We aim to respond to all inquiries within 30 days.`
  },
]
