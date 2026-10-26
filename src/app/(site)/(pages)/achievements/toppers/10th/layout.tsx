import { builtInMetadata } from '@/cms/render/builtin'

export const generateMetadata = () => builtInMetadata('/achievements/toppers/10th')

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
