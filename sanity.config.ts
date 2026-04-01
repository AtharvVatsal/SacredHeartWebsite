import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity/schemas/schema'
import {structure} from './sanity/structure'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'f1zzyq8p'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  basePath: '/admin',
  name: 'sacred-heart-admin',
  title: 'Sacred Heart School CMS',
  projectId,
  dataset,
  plugins: [
    structureTool({structure}),
    visionTool()
  ],
  schema: {
    types: schemaTypes,
  },
})