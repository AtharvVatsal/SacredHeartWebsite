// The first thing people see after signing in: plain-language entry points to the common tasks.
// Rendered by Payload above its default collection cards (admin.components.beforeDashboard).
import type { ServerProps } from 'payload'
import { ROLE_LABELS, roleOf } from '../access'

const card: React.CSSProperties = {
  display: 'block',
  padding: '20px 22px',
  borderRadius: 12,
  border: '1px solid var(--theme-elevation-150)',
  background: 'var(--theme-elevation-0)',
  textDecoration: 'none',
  color: 'inherit',
}

export async function Dashboard({ payload, user }: ServerProps) {
  const role = roleOf(user as never)
  const [pages, drafts] = await Promise.all([
    payload.count({ collection: 'pages', overrideAccess: false, user }),
    payload.count({ collection: 'pages', where: { _status: { equals: 'draft' } }, overrideAccess: false, user }),
  ])

  const tasks = [
    { href: '/admin/collections/pages', title: 'Edit a page', text: `Open any of the ${pages.totalDocs} pages and choose “Edit visually”.` },
    { href: '/admin/collections/pages/create', title: 'Create a new page', text: 'Start a new page and build it from ready-made sections.' },
    { href: '/admin/collections/media', title: 'Photos and files', text: 'Upload, replace and describe images and documents.' },
    ...(role === 'admin'
      ? [
          { href: '/admin/globals/site-settings', title: 'School details, menu and footer', text: 'Phone numbers, address, the main menu, header and footer.' },
          { href: '/admin/collections/users', title: 'People with access', text: 'Add administrators and editors, or remove access.' },
        ]
      : []),
    { href: '/', title: 'View the website', text: 'Opens the public website as visitors see it.' },
  ]

  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ margin: '0 0 6px' }}>Welcome{user && 'name' in user && user.name ? `, ${String(user.name)}` : ''}</h2>
      <p style={{ margin: '0 0 20px', color: 'var(--theme-elevation-600)' }}>
        You are signed in as {role ? `an ${ROLE_LABELS[role].toLowerCase()}` : 'a user'}.
        {role === 'editor' ? ' You can edit pages and save drafts; an administrator publishes them.' : ''}
        {drafts.totalDocs > 0 ? ` ${drafts.totalDocs} page${drafts.totalDocs === 1 ? ' has' : 's have'} never been published.` : ''}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
        {tasks.map((t) => (
          <a key={t.href} href={t.href} style={card}>
            <strong style={{ display: 'block', fontSize: 17, marginBottom: 6 }}>{t.title}</strong>
            <span style={{ color: 'var(--theme-elevation-600)', fontSize: 14, lineHeight: 1.45 }}>{t.text}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
