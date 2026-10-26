import { builtInMetadata } from '@/cms/render/builtin'

export const generateMetadata = () => builtInMetadata('/academics/calendar')

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
