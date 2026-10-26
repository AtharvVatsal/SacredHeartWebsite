// Staff list for the CMS migration: the published list with each person's photo
import { getStaffImage } from '@/components/about/staff-images'
import { staffMembers, statistics } from '@/data/school'
import type { FigureSource } from '@/cms/blocks/shared/figures'
import type { IconName } from '@/cms/blocks/shared/icon-names'
import { formatStat } from '@/lib/stats'

export const staffList = staffMembers.map((m) => {
  const src = m.image ?? getStaffImage(m.name, m.qualifications)
  return {
    name: m.name,
    role: m.role,
    department: m.department,
    qualifications: m.qualifications,
    photo: { mediaId: null, src: src ? encodeURI(src) : '', alt: m.name, position: 'center' as const },
  }
})

export const spotlightStats: { value: string; label: string; count: FigureSource }[] = [
  { value: '15+', label: 'Years Experience', count: 'none' },
  { value: '5000+', label: 'Students Guided', count: 'none' },
  { value: String(staffMembers.length), label: 'Staff Listed Below', count: 'staff' },
]

const stat = (label: string) => {
  const s = statistics.find((x) => x.label === label)
  return s ? formatStat(s) : ''
}

export const staffPageStats: { icon: IconName; value: string; label: string; count: FigureSource }[] = [
  { icon: 'GraduationCap', value: stat('Staff Strength'), label: 'Staff Strength', count: 'staffStrength' },
  { icon: 'Users', value: String(staffMembers.length), label: 'Staff Listed', count: 'staff' },
  { icon: 'Award', value: stat('Glorious Years'), label: 'Glorious Years', count: 'years' },
  { icon: 'Heart', value: '100%', label: 'Dedication', count: 'none' },
]
