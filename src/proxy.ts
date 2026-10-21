import { NextResponse, type NextRequest } from 'next/server'

// The school's old WordPress site served every page from the home URL with a query string
// (shsdharamshala.com/?page_id=83). Search engines and bookmarks still point there, so send each
// old address permanently (301) to the page that replaced it, keeping its search ranking.
const WORDPRESS_PAGES: Record<string, string> = {
  '82': '/',
  '83': '/about',
  '84': '/contact',
  '648': '/notifications',
  '702': '/admission',
  '717': '/about/aims',
  '718': '/about/pass-out-batches',
  '719': '/about/history',
  '728': '/about/office-bearers/messages',
  '730': '/about/office-bearers',
  '731': '/about',
  '755': '/achievements/toppers/12th',
  '756': '/gallery',
  '757': '/gallery',
  '758': '/gallery',
  '759': '/academics/syllabus-homework',
  '780': '/academics/calendar',
  '782': '/admission/online-fee',
  '784': '/admission/rules',
  '1313': '/about/principal',
  '2097': '/achievements/toppers/10th',
  '3277': '/admission/online-registration',
  '3562': '/',
  '6424': '/about/staff',
  '10136': '/admission/fee-structure',
}

export function proxy(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const pageId = searchParams.get('page_id')
  let destination: string | undefined
  if (pageId) destination = WORDPRESS_PAGES[pageId] ?? '/'
  // Individual staff entries (?faculty=name) now live on the staff page
  else if (searchParams.has('faculty')) destination = '/about/staff'
  if (!destination) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = destination
  url.search = ''
  return NextResponse.redirect(url, 301)
}

// Only the home URL carried WordPress query strings, so the proxy runs nowhere else
export const config = { matcher: '/' }
