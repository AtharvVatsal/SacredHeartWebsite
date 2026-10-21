import { builtInMetadata } from '@/cms/render/builtin'

export const generateMetadata = () => builtInMetadata('/privacy')

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
