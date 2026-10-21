// School Uniform sections, moved verbatim from that page
import type { BlockProps } from '../../document/definition'
import { Icon } from '../shared/Icon'
import { Inline, Paragraphs } from '../shared/InlineText'
import type { DressCard as DressDef, GoldInfoCard as GoldDef } from './admission.definitions'

export function GoldInfoCard({ icon, title, text }: BlockProps<typeof GoldDef>) {
  return (
    <section className="py-12 bg-gradient-to-b from-primary-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-secondary-100 to-amber-50 rounded-2xl p-6 md:p-8 border border-secondary-200 shadow-lg">
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-amber-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg transform hover:scale-110 transition-transform">
                <Icon name={icon} className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="font-display font-bold text-2xl text-primary-900 mb-2">{title}</h2>
                <Paragraphs text={text} className="text-gray-700 leading-relaxed text-lg" strongClassName="text-secondary-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

type P = BlockProps<typeof DressDef>

const HEADER: Record<P['tone'], { bar: string; subtitle: string }> = {
  pink: { bar: 'from-pink-500 to-rose-600', subtitle: 'text-pink-100' },
  blue: { bar: 'from-blue-600 to-indigo-700', subtitle: 'text-blue-100' },
  slate: { bar: 'from-slate-700 to-slate-900', subtitle: 'text-slate-300' },
  green: { bar: 'from-green-600 to-emerald-700', subtitle: 'text-green-100' },
  primary: { bar: 'from-primary-600 to-primary-700', subtitle: 'text-primary-200' },
}

const GROUP_BOXES = [
  { box: 'bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100', heading: 'text-blue-800', dot: 'bg-blue-500', check: 'text-blue-600' },
  { box: 'bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-100', heading: 'text-indigo-800', dot: 'bg-indigo-500', check: 'text-indigo-600' },
]
const COLUMN_TILES = [
  { tile: 'bg-pink-100', icon: 'text-pink-600' },
  { tile: 'bg-blue-100', icon: 'text-blue-600' },
]
const BOXES = [
  { box: 'bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100', heading: 'text-green-800', tile: 'bg-green-100', check: 'text-green-600' },
  { box: 'bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 border border-emerald-100', heading: 'text-emerald-800', tile: 'bg-emerald-100', check: 'text-emerald-600' },
]

function Body({ layout, groups, intro }: Pick<P, 'layout' | 'groups' | 'intro'>) {
  const items = groups[0]?.items ?? []
  switch (layout) {
    case 'list':
      return (
        <div className="grid gap-4">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-pink-50 transition-colors group/item">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover/item:from-pink-200 group-hover/item:to-rose-200 transition-colors">
                <Icon name="CheckCircle" className="w-5 h-5 text-pink-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-800 font-medium">{item.text}</p>
                {item.note && <p className="text-amber-800 text-sm mt-1">{item.note}</p>}
              </div>
            </div>
          ))}
        </div>
      )
    case 'groups':
      return (
        <>
          {groups.map((group, g) => {
            const s = GROUP_BOXES[g % GROUP_BOXES.length]
            return (
              <div key={g} className={s.box}>
                <h3 className={`font-bold ${s.heading} mb-3 flex items-center gap-2`}>
                  <span className={`w-2 h-2 ${s.dot} rounded-full`}></span>
                  {group.title}
                </h3>
                <div className={group.twoColumns ? 'grid md:grid-cols-2 gap-3' : 'grid gap-3'}>
                  {group.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Icon name="CheckCircle" className={`w-4 h-4 ${s.check}`} />
                      <span className="text-gray-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </>
      )
    case 'columns':
      return (
        <div className="grid md:grid-cols-2 gap-8">
          {groups.map((group, g) => {
            const s = COLUMN_TILES[g % COLUMN_TILES.length]
            return (
              <div key={g}>
                <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                  <span className={`w-8 h-8 ${s.tile} rounded-lg flex items-center justify-center`}>
                    <Icon name="Shirt" className={`w-4 h-4 ${s.icon}`} />
                  </span>
                  {group.title}
                </h3>
                <div className="space-y-2">
                  {group.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                      <Icon name="CheckCircle" className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )
    case 'boxes':
      return (
        <div className="grid md:grid-cols-2 gap-8">
          {groups.map((group, g) => {
            const s = BOXES[g % BOXES.length]
            return (
              <div key={g} className={s.box}>
                <h3 className={`font-bold ${s.heading} mb-4`}>{group.title}</h3>
                <div className="space-y-3">
                  {group.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white transition-colors">
                      <div className={`w-8 h-8 ${s.tile} rounded-lg flex items-center justify-center`}>
                        <Icon name="CheckCircle" className={`w-4 h-4 ${s.check}`} />
                      </div>
                      <span className="text-gray-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )
    default:
      return (
        <>
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" className="w-8 h-8 text-primary-600" />
          </div>
          {intro && <p className="text-gray-700 text-lg">{intro}</p>}
          {items.length > 0 && (
            <ul className="mt-6 grid sm:grid-cols-3 gap-3 text-left">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 rounded-xl bg-primary-50 p-4 text-sm text-gray-700">
                  <Icon name="CheckCircle" className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
                  {item.text}
                </li>
              ))}
            </ul>
          )}
        </>
      )
  }
}

const BODY_CLASS: Record<P['layout'], string> = { list: 'p-8', groups: 'p-8 space-y-6', columns: 'p-8', boxes: 'p-8', centred: 'p-8 text-center' }

export function DressCard({ tone, layout, background, icon, title, subtitle, intro, groups, note }: P) {
  const h = HEADER[tone]
  const card =
    tone === 'primary'
      ? 'bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl shadow-xl border border-primary-100 overflow-hidden hover:shadow-2xl transition-shadow group'
      : 'bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow group'
  return (
    <section className={background === 'fade' ? 'py-16 bg-gradient-to-b from-gray-50 to-white' : 'py-16 bg-white'}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className={card}>
            <div className={`bg-gradient-to-r ${h.bar} px-8 py-6`}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon name={icon} className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-white">{title}</h2>
                  {subtitle && <p className={h.subtitle}>{subtitle}</p>}
                </div>
              </div>
            </div>
            <div className={BODY_CLASS[layout]}>
              <Body layout={layout} groups={groups} intro={intro} />
              {note && (
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-5">
                  <p className="text-blue-800 flex items-start gap-3">
                    <Icon name="AlertCircle" className="w-6 h-6 flex-shrink-0 mt-0.5" />
                    <span>
                      <Inline text={note} />
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
