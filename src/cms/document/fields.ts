// Building blocks for block schemas: bounded text, safe links, approved choices, images.
// Everything an editor can type ends up in one of these, so this is where hostile input is stopped.
// Schemas are strict (publishing reports the error); rendering repairs field-by-field with defaults (validate.ts).
import { z } from 'zod'

/** Plain text with a length limit. Rendered as text, never as HTML. */
export const text = (max = 200, fallback = '') => z.string().max(max, `Keep this under ${max} characters`).default(fallback)

/** Longer text (paragraphs). Blank lines separate paragraphs; **bold**, *italic* and [links](/path) are allowed. */
export const longText = (max = 4000, fallback = '') => text(max, fallback)

const SAFE_HREF = /^(\/(?!\/)[^\s]*|#[\w-]*|https?:\/\/[^\s]+|mailto:[^\s]+|tel:[+\d\s()-]+)$/i

/** True for links that are safe to put in an href: site paths, #anchors, http(s), mailto and tel */
export function isSafeHref(href: string) {
  return SAFE_HREF.test(href.trim())
}

/** A link destination. Anything else (javascript:, data:, //other-site.com) is rejected. */
export const href = (fallback = '') =>
  z
    .string()
    .max(500)
    .refine((v) => v.trim() === '' || isSafeHref(v), { message: 'Links must start with /, #, https://, mailto: or tel:' })
    .transform((v) => v.trim())
    .default(fallback)

export const bool = (fallback = false) => z.boolean().default(fallback)

/** A choice from a fixed list */
export function choice<const T extends readonly [string, ...string[]]>(values: T, fallback: T[number]) {
  return z.enum(values).default(fallback)
}

export const int = (min: number, max: number, fallback: number) => z.number().int().min(min).max(max).default(fallback)

const IMAGE_SRC = /^(\/(?!\/)[^\s]*|https:\/\/[^\s]+)$/

/**
 * An image chosen in the editor. `mediaId` points at the media library; `src` is the address it was shown
 * from (also used for images that still live in /public). `alt` describes the image for screen readers.
 */
export const image = (fallback: { src?: string; alt?: string } = {}) =>
  z
    .object({
      mediaId: z.number().int().positive().nullable().default(null),
      src: z.string().max(500).refine((v) => v === '' || IMAGE_SRC.test(v), { message: 'Image address is not allowed' }).default(''),
      alt: z.string().max(300).default(''),
      width: z.number().int().positive().optional(),
      height: z.number().int().positive().optional(),
    })
    .default({ mediaId: null, src: fallback.src ?? '', alt: fallback.alt ?? '' })

export type ImageValue = z.infer<ReturnType<typeof image>>

/** A repeated list (cards, links...) with a maximum length so one page can't hold thousands of items */
export const list = <S extends z.ZodType>(item: S, max = 24, fallback: z.input<S>[] = []) => z.array(item).max(max, `At most ${max} items`).default(fallback as never)

/** Children of a slot (nested blocks). The items themselves are validated recursively by validate.ts. */
export const slot = () => z.array(z.unknown()).max(40, 'At most 40 items in one area').default([])
