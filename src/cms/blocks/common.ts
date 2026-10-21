// Small schema pieces shared by many blocks
import { z } from 'zod'
import { href, text } from '../document/fields'
import { ICON_NAMES } from './shared/icon-names'

export const button = (label = '', link = '') => z.object({ label: text(40, label), href: href(link) }).default({ label, href: link })
export type ButtonValue = z.infer<ReturnType<typeof button>>

export const icon = (fallback: (typeof ICON_NAMES)[number] = 'Star') => z.enum(ICON_NAMES).default(fallback)

/** Heading block shared by most sections: small eyebrow line, title, optional intro */
export const heading = (eyebrow: string, title: string, intro = '') =>
  z
    .object({ eyebrow: text(60, eyebrow), title: text(120, title), intro: text(400, intro) })
    .default({ eyebrow, title, intro })
export type HeadingValue = z.infer<ReturnType<typeof heading>>
