// Shared validation and delivery for the site's forms.

export type FieldErrors<T> = Partial<Record<keyof T, string>>

// Letters in any script (including Devanagari marks), spaces, full stops, apostrophes and hyphens
const NAME_PATTERN = new RegExp("^[\\p{L}\\p{M}][\\p{L}\\p{M} .'-]*$", 'u')
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function checkName(value: string, required = true) {
  const v = value.trim()
  if (!v) return required ? 'This field is required.' : undefined
  if (v.length < 2 || !NAME_PATTERN.test(v)) return 'Use letters only (spaces, full stops and apostrophes are fine).'
}

export function checkRequired(value: string) {
  if (!value.trim()) return 'This field is required.'
}

export function checkEmail(value: string) {
  const v = value.trim()
  if (!v) return 'This field is required.'
  if (!EMAIL_PATTERN.test(v)) return 'Enter an email address like name@example.com.'
}

// Indian numbers: 10-digit mobile, 0 + STD code landline, or +91 prefix
export function checkPhone(value: string, required = true) {
  const v = value.trim()
  if (!v) return required ? 'This field is required.' : undefined
  const digits = v.replace(/\D/g, '')
  if (!/^\+?[\d\s-]+$/.test(v) || digits.length < 10 || digits.length > 12) {
    return 'Enter a 10-digit mobile number or a landline with its STD code.'
  }
}

export function checkPincode(value: string) {
  const v = value.trim()
  if (!v) return 'This field is required.'
  if (!/^[1-9]\d{5}$/.test(v)) return 'Enter a 6-digit PIN code.'
}

// Date of birth for a school applicant: between 2 and 25 years ago
export function checkDateOfBirth(value: string, today = new Date()) {
  if (!value) return 'This field is required.'
  const dob = new Date(`${value}T00:00:00`)
  if (Number.isNaN(dob.getTime())) return 'Enter a valid date.'
  const youngest = new Date(today.getFullYear() - 2, today.getMonth(), today.getDate())
  const oldest = new Date(today.getFullYear() - 25, today.getMonth(), today.getDate())
  if (dob > youngest || dob < oldest) return "Check the date of birth — the student should be between 2 and 25 years old."
}

export function firstErrorId<T>(errors: FieldErrors<T>, order: (keyof T)[], prefix: string) {
  const key = order.find(k => errors[k])
  return key ? `${prefix}-${String(key)}` : null
}

export type DeliveryResult = { status: 'sent' } | { status: 'failed' }

// POST the form as JSON to a configured endpoint. Success only when the server answers 2xx.
export async function deliverForm(endpoint: string, payload: Record<string, string>): Promise<DeliveryResult> {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
    return res.ok ? { status: 'sent' } : { status: 'failed' }
  } catch {
    return { status: 'failed' }
  }
}

export function formatForEmail(fields: [label: string, value: string][]) {
  return fields
    .filter(([, value]) => value.trim())
    .map(([label, value]) => `${label}: ${value.trim()}`)
    .join('\n')
}
