import { BuiltInPage } from '@/cms/render/builtin'
import AboutPage from './legacy-page'

// The CMS version of this page once it is published there; until then the original in legacy-page.tsx
export default function Page() {
  return <BuiltInPage path="/about" legacy={<AboutPage />} />
}
