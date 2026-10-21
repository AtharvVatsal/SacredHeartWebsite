// Text of the School Fee page around the fee table, as used by the CMS migration.
// The original page (legacy-page.tsx) keeps its own copy of the same text; the fees are in src/data/fees.ts.
import type { GradientName } from '@/cms/blocks/shared/gradients'
import type { IconName } from '@/cms/blocks/shared/icon-names'
import { classFees } from '@/data/fees'

/** The published fee list in the shape the CMS edits (totals are worked out from the rows) */
export const feeClasses = classFees.map((c) => ({
  label: c.label,
  categories: c.categories.map((cat) => ({ name: cat.name, quarters: cat.quarters.map((q) => ({ rows: q.rows.map((r) => ({ ...r })) })) })),
}))

export const payOnline = {
  title: 'Pay your fee online',
  text: 'The online portal is open from the 1st to the 25th of every month. Read the step-by-step guide before you pay.',
  button: { label: 'Online fee guide', href: '/admission/online-fee' },
}

export const feeGuidelines: { icon: IconName; title: string; text: string; color: GradientName }[] = [
  { icon: 'Calendar', title: 'Annual Payment', text: 'Tuition fee is to be paid for 12 months and deposited at PNB Sidhpur on prescribed dates.', color: 'from-blue-500 to-indigo-600' },
  { icon: 'AlertCircle', title: 'Subject to Revision', text: 'Fees and other dues are liable to be revised at any time without prior notice.', color: 'from-amber-500 to-orange-500' },
  { icon: 'GraduationCap', title: 'Readmission', text: 'Readmission facility available in Classes I, V, and VIII only.', color: 'from-emerald-500 to-green-600' },
]

export const securityInfo: { icon: IconName; text: string }[] = [
  { icon: 'ShieldCheck', text: 'Security amount (less school dues if any) is refundable' },
  { icon: 'Clock', text: 'Application must be made within three months of leaving' },
  { icon: 'CheckCircle', text: 'Clearance of all pending dues required' },
]
