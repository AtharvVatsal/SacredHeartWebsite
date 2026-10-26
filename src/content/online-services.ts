// Content of the Pay Fee Online and Online Registration pages, as used by the CMS migration.
// The original pages (legacy-page.tsx) keep their own copy of the same text.
import type { IconName } from '@/cms/blocks/shared/icon-names'

export interface GuideStepContent {
  title: string
  summary: string
  icon: IconName
  points: { text: string }[]
  important: string
  tables: { caption: string; headA: string; headB: string; rows: { a: string; b: string }[] }[]
  chipsTitle: string
  chips: { text: string }[]
}

const lines = (list: string[]) => list.map((text) => ({ text }))
type StepInput = Partial<Omit<GuideStepContent, 'points'>> & Pick<GuideStepContent, 'title' | 'summary' | 'icon'> & { points: string[] }
const step = (s: StepInput): GuideStepContent => ({
  important: '',
  tables: [],
  chipsTitle: '',
  chips: [],
  ...s,
  points: lines(s.points),
})

const monthTable = (caption: string, groups: [string, string][]) => ({ caption, headA: 'To pay for', headB: 'Select', rows: groups.map(([a, b]) => ({ a, b })) })

export const feeSteps: GuideStepContent[] = [
  step({
    title: 'Log in',
    summary: 'Open the online fee portal',
    icon: 'LogIn',
    points: [
      'Use the "Pay fee online" button on this page to open the portal.',
      'Enter the user name and password issued to you by the school.',
      'If you are still using the default password, change it straight after logging in with the Change Password link.',
    ],
  }),
  step({
    title: 'Fetch your due fees',
    summary: 'Choose the right month group',
    icon: 'ListChecks',
    points: [
      'Click PAY FEE NOW, the first option in the menu.',
      'Select the month up to which you want to pay. The portal shows your pending months by the quarterly schedule below.',
      'Review the fee details shown, scroll to the bottom and click PAY FEE. You will be taken to the payment gateway.',
    ],
    tables: [
      monthTable('LKG to Class X', [['February and March', 'March'], ['April, May and June', 'June'], ['July to October', 'October'], ['November to January', 'January']]),
      monthTable('Classes XI and XII', [['April, May and June', 'June'], ['July, August and September', 'September'], ['October to December', 'December'], ['January to March', 'March']]),
    ],
    important: 'Check that the payable amount is right before you pay. If a fine or late fee shows before the due date, it may be a technical error: do not pay, and contact the school instead. Once the fee is paid, a wrongly charged fine or late fee cannot be refunded.',
  }),
  step({
    title: 'Pay and get your receipt',
    summary: 'Complete the payment securely',
    icon: 'CreditCard',
    points: [
      'Choose UPI, credit card, debit card or net banking, and click MAKE PAYMENT.',
      'To pay with Bharat QR on a computer: click Pay Now, scan the QR code that appears with Google Pay, PhonePe, BHIM or another UPI app, and complete the payment on your phone.',
      'Wait until the on-screen timer finishes. The receipt is generated automatically.',
      'To check your receipt later, open the school app and tap the Receipt icon.',
    ],
  }),
]

export const registrationSteps: GuideStepContent[] = [
  step({
    title: 'Open the registration portal',
    summary: 'Start your online registration',
    icon: 'Globe',
    points: ['Use the "Open registration portal" button on this page.', 'The portal shows two options: Login and Register.'],
  }),
  step({
    title: 'First-time user: register',
    summary: 'Create your registration account',
    icon: 'UserPlus',
    points: [
      'Click Register and enter the parent’s name, phone number, email ID and a password.',
      'Click Submit / Register and wait for the success message, or for verification by email or SMS.',
      'Keep the phone number and password safe. You will need them to log in again.',
    ],
  }),
  step({
    title: 'Already registered: log in',
    summary: 'Access your registration account',
    icon: 'LogIn',
    points: [
      'Click Login and enter your email ID or phone number and password, then click Sign In.',
      'Complete the OTP or email verification if you are asked to.',
      'Forgotten your password? Click Forgot Password to reset it.',
    ],
  }),
  step({
    title: 'Check class availability',
    summary: 'See whether admission is open',
    icon: 'ClipboardList',
    points: [
      'If admission is open for a class, an Apply Now button appears.',
      'If there are no vacant seats, the Apply Now button and the registration form are not shown.',
      'Click Apply Now to open the online registration form.',
    ],
  }),
  step({
    title: 'Fill in the form carefully',
    summary: 'Enter accurate student information',
    icon: 'PenLine',
    points: [
      'Complete every field marked with an asterisk (*).',
      'Enter the student’s and parents’ details exactly as they appear on the birth certificate, especially the student’s name and date of birth.',
      'Review everything before you continue. Typing mistakes can cause problems when documents are verified at admission.',
    ],
    important: 'Check the student’s name and date of birth carefully before submitting the form.',
  }),
  step({
    title: 'Submit the form',
    summary: 'Go on to the online payment',
    icon: 'Send',
    points: ['After checking all the details, click Submit.', 'You will be taken to the payment gateway automatically.'],
  }),
  step({
    title: 'Pay the registration fee',
    summary: 'Complete the payment',
    icon: 'CreditCard',
    points: [
      'To pay with Bharat QR: click Pay Now, scan the QR code that appears with any UPI app (Google Pay, PhonePe, BHIM, Paytm or another), and complete the payment on your phone.',
      'On a computer, the QR code appears on screen; scan it with the UPI app on your phone.',
      'After paying, wait until the on-screen timer finishes. The school receipt is generated automatically when it ends.',
    ],
    chipsTitle: 'Accepted payment methods',
    chips: lines(['Credit card', 'Debit card', 'Net banking', 'Bharat QR (UPI)', 'Digital wallets']),
    important: 'Do not close or refresh the page while the timer is running.',
  }),
  step({
    title: 'Save your payment proof',
    summary: 'Keep your payment records safe',
    icon: 'Receipt',
    points: [
      'Take a screenshot of the payment confirmation.',
      'Click Download Receipt and save the receipt.',
      'Keep both the screenshot and the receipt until the admission process is complete.',
    ],
  }),
  step({
    title: 'Check and print the form',
    summary: 'Prepare your registration documents',
    icon: 'Printer',
    points: [
      'Print the registration form on A4 paper and check every detail.',
      'If you notice a mistake, contact the school’s administrative department before submitting the form, then print the corrected form.',
      'Attach photocopies of the Aadhaar card, birth certificate and address proof, the previous class’s final report card, and any other document the school asks for.',
    ],
  }),
  step({
    title: 'Submit at the school office',
    summary: 'Hand in the form and documents',
    icon: 'Building',
    points: [
      'Submit the printed registration form with all the required documents at the school office.',
      'The submission date is announced in the official school notification. Please check it before visiting the school.',
    ],
  }),
]

export const feeInfoTiles: { icon: IconName; title: string; text: string }[] = [
  { icon: 'CalendarClock', title: 'Portal open 1st to 25th', text: 'The online portal is open from the 1st to the 25th of every month, and closes for that month after the 25th.' },
  { icon: 'Landmark', title: 'Two ways to pay', text: 'Fees can be paid only through the online school app portal, or offline at Punjab National Bank, Sidhpur.' },
]

export interface HelpCardContent {
  tone: 'red' | 'white'
  icon: IconName
  title: string
  text: string
  items: { text: string }[]
  note: string
}

export const feeHelpCards: HelpCardContent[] = [
  {
    tone: 'red',
    icon: 'AlertTriangle',
    title: 'Payment failed but money deducted?',
    text: '',
    items: lines([
      'Do not pay again straight away. Wait 24–48 hours for the transaction to be processed and the receipt to be generated.',
      'If the problem is still there after that, contact the school IT department. They will check the transaction and help you.',
      'If you have already paid a second time, inform the school first, not your bank. The school will check its records and guide you.',
    ]),
    note: '',
  },
  {
    tone: 'white',
    icon: 'RotateCcw',
    title: 'Duplicate payment refunds',
    text: "If a fee is paid twice, the school refunds only the excess amount. Transaction charges, convenience fees, payment gateway charges, bank charges and taxes are not refundable. Refunds follow the school's refund policy and the usual processing time of the gateway or bank.",
    items: [],
    note: '',
  },
]

export const gatewayCharges = {
  title: 'Payment gateway charges',
  headA: 'Method',
  headB: 'What to expect',
  rows: [
    { a: 'UPI', b: 'Charges are generally minimal, as UPI is a direct bank transfer.' },
    { a: 'Net banking', b: 'May carry a nominal fee, depending on your bank.' },
    { a: 'Credit card', b: 'Usually the highest charges, set by the payment gateway and the card issuer.' },
    { a: 'Debit card', b: 'Usually lower than credit cards, though charges vary by bank.' },
  ],
  footnote: "Charges are set by the payment gateway and banks, and can vary with the payment method, the amount and the bank's own policies.",
}

export const registrationHelpCards: HelpCardContent[] = [
  {
    tone: 'red',
    icon: 'AlertTriangle',
    title: 'Payment failed but money deducted?',
    text: '',
    items: lines([
      'Do not pay again straight away. Wait 24–48 hours for the transaction to be processed.',
      'If there is still no receipt after 24–48 hours, contact the school IT department. The school will check the payment and guide you.',
      'Please do not contact your bank before informing the school.',
    ]),
    note: '',
  },
  {
    tone: 'white',
    icon: 'RotateCcw',
    title: 'Paid twice?',
    text: 'If the registration fee is paid more than once, only the extra amount is refunded. These charges are not refundable:\n\ntransaction charges, convenience fees, payment gateway charges, bank charges and taxes.',
    items: [],
    note: "Refunds follow the school's refund policy and the usual processing time of the payment gateway or bank.",
  },
  {
    tone: 'white',
    icon: 'FolderCheck',
    title: 'Keep copies of',
    text: '',
    items: lines(['The filled registration form', 'The payment receipt', 'The documents you submitted', 'The acknowledgement, if one is issued']),
    note: '',
  },
]
