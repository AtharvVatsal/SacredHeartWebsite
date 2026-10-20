// Photo albums. Photos live in /images/Gallery/<id>/NN.webp (1400px) with thumbnails in /thumbs/NN.webp (480px).
// Albums and photos come from the school's published gallery; a few existing albums keep a single local photo.

export type AlbumCategory = 'cultural' | 'sports' | 'events' | 'campus'

export interface Album {
  id: string
  name: string
  description: string
  category: AlbumCategory
  cover: string
  count: number
  // Albums that hold one local photo instead of a numbered set
  single?: string
}

export const albums: Album[] = [
  { id: 'annual-function', name: 'Annual Function', description: 'Annual day celebration with cultural performances', category: 'cultural', cover: '/images/Events/AnuualFunction.webp', count: 64 },
  { id: 'oath-ceremony', name: 'Oath Ceremony', description: 'Students taking pledges and commitments', category: 'events', cover: '/images/Events/OathCeremony.webp', count: 17 },
  { id: 'world-environment-day', name: 'World Environment Day', description: 'Awareness and activities for environmental conservation', category: 'events', cover: '/images/Events/WorldEnvironmentDay.webp', count: 11 },
  { id: 'school-feast', name: 'School Feast', description: 'Celebrating together with joy and delicious food', category: 'cultural', cover: '/images/Events/SchoolFeast.webp', count: 22 },
  { id: 'school-reopen', name: 'School Re-Open', description: 'New session begins with enthusiasm', category: 'events', cover: '/images/Events/ScoolReopening.webp', count: 17 },
  { id: 'xi-reopen', name: 'Class XI Re-Open Day', description: 'Class XI students begin their new session', category: 'events', cover: '/images/Gallery/xi-reopen/thumbs/01.webp', count: 5 },
  { id: 'teachers-day', name: 'Teacher\'s Day', description: 'Honoring our beloved teachers', category: 'cultural', cover: '/images/Events/TeachersDay.webp', count: 14 },
  { id: 'asisc-literary-events', name: 'ASISC Literary Events', description: 'Literary events of the Association of Schools for the ISC', category: 'cultural', cover: '/images/Gallery/asisc-literary-events/thumbs/01.webp', count: 14 },
  { id: 'golden-jubilee', name: 'Golden Jubilee', description: '50 years of excellence in education', category: 'events', cover: '/images/Events/GoldenJublee.webp', count: 7 },
  { id: 'farewell-party', name: 'Farewell Party', description: 'Bidding farewell to our senior students', category: 'events', cover: '/images/Events/FarewellParty.webp', count: 21 },
  { id: 'zone-competition-sports', name: 'Zone Competition Sports', description: 'Inter-zone sports competitions', category: 'sports', cover: '/images/Events/Zone Competitions - Sports.webp', count: 15 },
  { id: 'notice-board', name: 'School Notice Board', description: 'Important notices and updates', category: 'events', cover: '/images/Events/NoticeBoard.webp', count: 4 },
  { id: 'diwali', name: 'Diwali', description: 'Festival of lights celebration', category: 'cultural', cover: '/images/Events/Diwali.webp', count: 10 },
  { id: 'voting', name: 'School Voting', description: 'Student council elections', category: 'events', cover: '/images/Events/Voting.webp', count: 8 },
  { id: 'health-care', name: 'Health Care', description: 'Health and wellness activities', category: 'events', cover: '/images/Events/HealthCare.webp', count: 25 },
  { id: 'prize-distribution', name: 'Prize Distribution', description: 'Awarding winners of various competitions', category: 'events', cover: '/images/Events/PrizeDistribution.webp', count: 9 },
  { id: 'childrens-day', name: 'Children\'s Day', description: 'Celebrating childhood and joy', category: 'cultural', cover: '/images/Events/ChildrensDay.webp', count: 28 },
  { id: 'art-exhibition', name: 'Art Exhibition', description: 'Showcasing creative artwork', category: 'cultural', cover: '/images/Events/ArtExhibition.webp', count: 37 },
  { id: 'yoga-diwas', name: 'Yoga Diwas', description: 'International Day of Yoga, with more than a thousand students taking part', category: 'sports', cover: '/images/Events/YogaDay.webp', count: 9 },
  { id: 'cisce-yoga-olympiad', name: 'CISCE National Yoga Olympiad', description: 'Moments from the CISCE National Yoga Olympiad', category: 'sports', cover: '/images/Gallery/cisce-yoga-olympiad/thumbs/01.webp', count: 38 },
  { id: 'school-campus', name: 'School Campus', description: 'Beautiful campus views', category: 'campus', cover: '/images/Events/SchoolCampus.webp', count: 16 },
  { id: 'farewell-felicitation', name: 'Farewell and Felicitation', description: 'Honoring our departing students', category: 'events', cover: '/images/Events/FarewellAndFelicitationCeremony.webp', count: 14 },
  { id: 'other-images', name: 'More Moments', description: 'Guests, visits and everyday school life', category: 'events', cover: '/images/Gallery/other-images/thumbs/02.webp', count: 8 },
  { id: 'staff', name: 'Staff', description: 'Our dedicated faculty and staff', category: 'events', cover: '/images/Events/Staff.webp', count: 1, single: '/images/Events/Staff.webp' },
]

const pad = (n: number) => String(n).padStart(2, '0')

export function albumPhoto(album: Album, index: number) {
  return album.single ?? `/images/Gallery/${album.id}/${pad(index + 1)}.webp`
}

export function albumThumb(album: Album, index: number) {
  return album.single ?? `/images/Gallery/${album.id}/thumbs/${pad(index + 1)}.webp`
}

export const totalPhotos = albums.reduce((n, a) => n + a.count, 0)

// School videos on YouTube (titles as published there)
export const videos = [
  { id: 'jwEzWZsKNdE', title: 'Sacred Heart Sr. Sec. School, Dharamshala', note: 'A film about the school by Himachal 365' },
  { id: '8Tfh0UhxwGU', title: "Happy Teacher's Day", note: "Teacher's Day celebrations" },
  { id: 'KcV86owwT8g', title: 'Art and Craft Exhibition', note: 'Student artwork on display' },
]
