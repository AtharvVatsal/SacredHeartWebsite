// Figures a section can show from elsewhere instead of its own copy: the number of staff on the Staff page, or a
// figure from Site settings, so a figure repeated on several pages is changed once (server-safe; the client side
// is useFigures in LinkedData.tsx)
import { choice } from '../../document/fields'

export const FIGURE_SOURCES = ['none', 'staff', 'years', 'staffStrength', 'students', 'libraryBooks', 'established'] as const
export type FigureSource = (typeof FIGURE_SOURCES)[number]

/** Where a figure comes from; 'none' shows the figure typed in the section */
export const figureSource = () => choice(FIGURE_SOURCES, 'none')

const BY_LABEL: Record<string, FigureSource> = {
  'Glorious Years': 'years',
  'Staff Strength': 'staffStrength',
  'Students Strength': 'students',
  'Library Books': 'libraryBooks',
}

/** The Site settings figure that one of the school's statistics (src/data/school.ts) stands for */
export const sourceOfStat = (label: string): FigureSource => BY_LABEL[label] ?? 'none'
