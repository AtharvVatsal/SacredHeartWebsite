// Content of the terms page, shared by the page itself and the CMS migration (src/cms/seed).
// Icons are names from the approved set (src/cms/blocks/shared/icon-names.ts).
import { schoolInfo } from '@/data/school'
import type { IconName } from '@/cms/blocks/shared/icon-names'

export const termsSections: { icon: IconName; title: string; content: string }[] = [
  {
    icon: 'FileText',
    title: 'Acceptance of Terms',
    content: `By accessing and using the Sacred Heart Senior Secondary School website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use this website.

The school reserves the right to modify these terms at any time without prior notice. Your continued use of the website following any changes constitutes your acceptance of the modified terms.`
  },
  {
    icon: 'Globe',
    title: 'Website Use',
    content: `The content on this website, including but not limited to text, graphics, images, logos, and software, is the property of Sacred Heart Senior Secondary School and is protected by applicable intellectual property laws.

You may:
• View and print content for personal, non-commercial use
• Share content for educational purposes with proper attribution

You may not:
• Modify, reproduce, or distribute content without written permission
• Use the website for any unlawful or prohibited purpose
• Attempt to gain unauthorized access to any part of the website
• Interfere with the website's operation or security`
  },
  {
    icon: 'BookOpen',
    title: 'Academic Information',
    content: `While we strive to keep all information on this website accurate and up-to-date:

• Academic calendars, exam schedules, and fee structures are subject to change
• Results and academic records published online are for informational purposes
• Students and parents should confirm important dates with the school directly
• The school is not liable for any discrepancies arising from reliance on website information

For the most current academic information, please contact the school office directly.`
  },
  {
    icon: 'Users',
    title: 'User Conduct',
    content: `When using this website, you agree to:

• Provide accurate and truthful information when submitting forms
• Not use automated tools or bots to access the website
• Not upload or transmit any viruses, malware, or harmful content
• Not attempt to interfere with the proper functioning of the website
• Respect the privacy and rights of other users

Users found violating these terms may have their access restricted or terminated.`
  },
  {
    icon: 'AlertTriangle',
    title: 'Disclaimer of Warranties',
    content: `This website is provided "as is" and "as available" without warranties of any kind, either express or implied.

The school does not warrant that:
• The website will be uninterrupted, secure, or error-free
• The information on the website is complete, accurate, or current
• The website is free from viruses or other harmful components
• Any errors or defects will be corrected

The school shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of this website.`
  },
  {
    icon: 'Scale',
    title: 'Privacy and Data',
    content: `Your use of this website is also governed by our Privacy Policy. By using this website, you consent to the collection and use of information as described in the Privacy Policy.

We are committed to protecting the personal information of students, parents, and visitors in accordance with applicable data protection laws. Please review our Privacy Policy for more details on how we handle your data.`
  },
  {
    icon: 'Mail',
    title: 'Contact Information',
    content: `If you have questions about these Terms of Use, please contact us:

Sacred Heart Senior Secondary School
Sidhpur, Dharamshala
Himachal Pradesh - 176057

Email: ${schoolInfo.contact.emails.join(', ')}
Phone: ${schoolInfo.contact.phones.join(', ')}

We will respond to your inquiries as soon as reasonably possible.`
  },
]
