// Sections of the Academics pages
import { z } from 'zod'
import { defineBlock } from '../../document/definition'
import { list, text } from '../../document/fields'
import { icon } from '../common'
import { leaveGuidelines } from '@/content/academics'

export const NoticeStrip = defineBlock({
  type: 'NoticeStrip',
  label: 'Notice strip (amber, one line)',
  category: 'content',
  schema: z.object({ icon: icon('AlertCircle'), text: text(200, 'Regular attendance is crucial for student progress') }),
})

export const GuidelineCard = defineBlock({
  type: 'GuidelineCard',
  label: 'Guidelines card (icon list)',
  category: 'academics',
  schema: z.object({
    icon: icon('FileText'),
    title: text(120, 'Leave & Absence Guidelines'),
    items: list(z.object({ icon: icon('Calendar'), title: text(120), text: text(600) }), 30, leaveGuidelines),
  }),
})

export const CallBand = defineBlock({
  type: 'CallBand',
  label: 'Questions band with a call button',
  category: 'actions',
  schema: z.object({
    title: text(120, 'Questions?'),
    text: text(400, 'For any clarification regarding leave policies, please contact the school office.'),
  }),
})

export const academicsBlocks = [NoticeStrip, GuidelineCard, CallBand]
