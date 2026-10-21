// Sections of the Privacy Policy and Terms of Use pages (same design on both)
import { z } from 'zod'
import { defineBlock } from '../../document/definition'
import { choice, list, longText, text } from '../../document/fields'
import { privacySections } from '@/content/privacy'
import { button, icon } from '../common'

export const PolicyIntro = defineBlock({
  type: 'PolicyIntro',
  label: 'Policy introduction card',
  category: 'content',
  schema: z.object({
    icon: icon('AlertCircle'),
    tone: choice(['green', 'gold'] as const, 'green'),
    label: text(60, 'Last Updated'),
    value: text(60, 'April 2025'),
    text: longText(2000, 'Sacred Heart Senior Secondary School ("we," "our," or "us") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or interact with our school services.'),
  }),
})

export const PolicySections = defineBlock({
  type: 'PolicySections',
  label: 'Policy sections (icon, title, text)',
  category: 'content',
  schema: z.object({
    sections: list(z.object({ icon: icon('Shield'), title: text(120), content: longText(4000) }), 20, privacySections),
  }),
})

export const SimpleCta = defineBlock({
  type: 'SimpleCta',
  label: 'Call to action (green, one button)',
  category: 'actions',
  schema: z.object({
    title: text(120, 'Have More Questions?'),
    text: text(400, "We're here to help. Reach out to us for any questions about our privacy practices."),
    button: button('Contact Us', '/contact'),
  }),
})

export const legalBlocks = [PolicyIntro, PolicySections, SimpleCta]
