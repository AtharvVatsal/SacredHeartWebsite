import { BuiltInPage } from '@/cms/render/builtin'
import Class10ToppersPage from './legacy-page'

// The CMS version of this page once it is published there; until then the original in legacy-page.tsx
export default function Page() {
  return <BuiltInPage path="/achievements/toppers/10th" legacy={<Class10ToppersPage />} />
}
