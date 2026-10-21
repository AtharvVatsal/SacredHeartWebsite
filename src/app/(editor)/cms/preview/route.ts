import config from '@payload-config'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import type { NextRequest } from 'next/server'

// Turns on preview (Next.js draft mode) for a signed-in editor and opens the page. Pages only show drafts
// when they can also confirm the Payload session, so this cookie alone never reveals anything to visitors.
export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path') ?? '/'
  // Only paths on this site: no "//other.site" or absolute addresses
  if (!path.startsWith('/') || path.startsWith('//') || /[\s\\]/.test(path)) {
    return new Response('Invalid page address', { status: 400 })
  }
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: request.headers })
  if (!user) {
    redirect(`/admin/login?redirect=${encodeURIComponent(`/cms/preview?path=${encodeURIComponent(path)}`)}`)
  }
  ;(await draftMode()).enable()
  redirect(path)
}
