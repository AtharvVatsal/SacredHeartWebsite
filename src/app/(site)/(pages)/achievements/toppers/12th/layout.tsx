import { builtInMetadata } from '@/cms/render/builtin'

export const generateMetadata = () => builtInMetadata('/achievements/toppers/12th')

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
