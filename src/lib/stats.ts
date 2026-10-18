import type { Stat } from '@/types'

// "2.6K" -> { end: 2.6, decimals: 1, unit: 'K' }, "112" -> { end: 112, decimals: 0, unit: '' }
export function parseStatValue(value: string) {
  const match = value.trim().match(/^(\d+(?:\.\d+)?)(.*)$/)
  if (!match) return { end: 0, decimals: 0, unit: value }
  const [, number, unit] = match
  const decimals = number.includes('.') ? number.split('.')[1].length : 0
  return { end: parseFloat(number), decimals, unit: unit.trim() }
}

export function formatStat(stat: Stat) {
  return `${stat.value}${stat.suffix ?? ''}`
}
