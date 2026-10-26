import { builtInMetadata } from '@/cms/render/builtin'

export const generateMetadata = () => builtInMetadata('/notifications')

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
