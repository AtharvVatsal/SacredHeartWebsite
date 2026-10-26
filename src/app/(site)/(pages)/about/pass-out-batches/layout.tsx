import { builtInMetadata } from '@/cms/render/builtin'

export const generateMetadata = () => builtInMetadata('/about/pass-out-batches')

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
