import type { ReactNode } from 'react'

interface FieldProps {
  id: string
  label: ReactNode
  required?: boolean
  error?: string
  className?: string
  labelClassName?: string
  children: ReactNode
}

// Label + control + error message, tied together by id so screen readers announce all three
export default function Field({
  id,
  label,
  required,
  error,
  className,
  labelClassName = 'block text-sm font-medium text-gray-700 mb-2',
  children,
}: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClassName}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}

// Props for the input inside a Field
export function fieldA11y(id: string, error?: string) {
  return {
    id,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? `${id}-error` : undefined,
  } as const
}
