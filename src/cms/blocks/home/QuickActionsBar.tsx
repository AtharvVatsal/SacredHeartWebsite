import { Calendar, CreditCard, FileText, UserPlus } from 'lucide-react'
import type { BlockProps } from '../../document/definition'
import { SmartLink } from '../shared/SmartLink'
import type { QuickActionsBar as Def } from './definitions'

const ICONS = { CreditCard, FileText, Calendar, UserPlus } as const

export default function QuickActionsBar({ buttons }: BlockProps<typeof Def>) {
  return (
    <div className="bg-primary-800 py-5">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4">
          {buttons
            .filter((b) => b.label && b.href)
            .map((b, i) => {
              const Icon = b.icon !== 'none' ? ICONS[b.icon] : null
              return (
                <SmartLink
                  key={i}
                  href={b.href}
                  className={
                    b.highlight
                      ? 'inline-flex items-center gap-2 bg-secondary-400 text-primary-900 px-5 py-2.5 rounded-full font-semibold hover:bg-secondary-300 transition-all text-sm'
                      : 'inline-flex items-center gap-2 bg-white/10 text-white px-5 py-2.5 rounded-full font-medium hover:bg-white/20 transition-all text-sm border border-white/20'
                  }
                >
                  {Icon && <Icon size={16} />}
                  {b.label}
                </SmartLink>
              )
            })}
        </div>
      </div>
    </div>
  )
}
