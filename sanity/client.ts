import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
})

export async function getDocuments(type: string) {
  return client.fetch(`*[_type == "${type}"] | order(_createdAt desc)`)
}

export async function getDocument(type: string, id: string) {
  return client.fetch(`*[_type == "${type}" && _id == $id][0]`, { id })
}
