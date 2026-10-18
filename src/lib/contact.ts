import { schoolInfo } from '@/data/school'

export const schoolPhones = schoolInfo.contact.phones
export const schoolEmail = schoolInfo.contact.emails[0]

// "01892-222428" -> "tel:01892222428"
export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

export function mailtoHref(subject: string, body = '', to = schoolEmail) {
  const params = [`subject=${encodeURIComponent(subject)}`]
  if (body) params.push(`body=${encodeURIComponent(body)}`)
  return `mailto:${to}?${params.join('&')}`
}
