import { builtInMetadata } from '@/cms/render/builtin'

export const generateMetadata = () => builtInMetadata('/academics/syllabus-homework')

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
