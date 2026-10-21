import { builtInMetadata } from '@/cms/render/builtin'

export const generateMetadata = () => builtInMetadata('/terms')

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
