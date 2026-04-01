import { type SchemaTypeDefinition } from 'sanity'

import officeBearer from './officeBearer'
import topper from './topper'
import galleryEvent from './galleryEvent'
import notification from './notification'
import staff from './staff'
import schoolInfo from './schoolInfo'
import navigation from './navigation'
import heroSection from './heroSection'
import pageContent from './pageContent'
import pageSection from './pageSection'
import homePageContent from './homePageContent'
import websitePage from './websitePage'
import statistic from './statistic'
import quickLink from './quickLink'
import achievement from './achievement'
import principalMessage from './principalMessage'
import studentLeader from './studentLeader'
import facility from './facility'
import schoolHistory from './schoolHistory'
import schoolAnthem from './schoolAnthem'
import batchYear from './batchYear'

export const schemaTypes: SchemaTypeDefinition[] = [
  staff,
  officeBearer,
  topper,
  galleryEvent,
  notification,
  schoolInfo,
  navigation,
  heroSection,
  pageContent,
  pageSection,
  homePageContent,
  websitePage,
  statistic,
  quickLink,
  achievement,
  principalMessage,
  studentLeader,
  facility,
  schoolHistory,
  schoolAnthem,
  batchYear,
]

export const schema = {
  types: schemaTypes,
}