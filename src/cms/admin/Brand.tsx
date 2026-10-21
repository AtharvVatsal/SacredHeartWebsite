/* eslint-disable @next/next/no-img-element -- Payload admin graphics are plain elements outside next/image */
// School branding for the admin panel (sign-in screen and the top-left icon)

export function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <img src="/images/logo_batch.png" alt="" width={56} height={56} style={{ width: 56, height: 56, objectFit: 'contain' }} />
      <div style={{ lineHeight: 1.2 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#14532d' }}>Sacred Heart Sr. Sec. School</div>
        <div style={{ fontSize: 14, color: '#4b5563' }}>Website editor</div>
      </div>
    </div>
  )
}

export function Icon() {
  return <img src="/images/logo_batch.png" alt="Sacred Heart" width={28} height={28} style={{ width: 28, height: 28, objectFit: 'contain' }} />
}
