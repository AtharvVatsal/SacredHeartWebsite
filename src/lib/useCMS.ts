import { useState, useEffect, useRef } from 'react'
import * as cms from './cms'
import {
  schoolInfo,
  staffMembers,
  notifications,
  achievements,
  officeBearers,
  principalMessage,
  navigation,
  statistics,
  quickLinks,
  heroSection,
  facilities,
  studentLeaders,
  schoolHistory,
  schoolAnthem,
  batchPhotos,
} from '@/data/school'

// Each hook starts with the local data so the first render (and the pre-rendered HTML) already has the content.
// The fetch keeps the door open for a real CMS later; today cms.ts returns the same local data.
export function useCMS<T>(fetchFn: () => Promise<T>, initialValue: T) {
  const [data, setData] = useState<T>(initialValue)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const initialRef = useRef(initialValue)
  initialRef.current = initialValue

  useEffect(() => {
    let mounted = true

    async function load() {
      try {
        setLoading(true)
        const result = await fetchFn()
        // Skip the update when nothing changed, so the page doesn't re-render (or shift) for identical data
        if (mounted && result !== initialRef.current) {
          setData(result)
          setError(null)
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load data')
          setData(initialRef.current)
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()
    return () => {
      mounted = false
    }
  }, [fetchFn])

  return { data, loading, error }
}

export const useSchoolInfo = () => useCMS(cms.getSchoolInfo, schoolInfo)
export const useStaff = () => useCMS(cms.getStaff, staffMembers)
export const useNotifications = () => useCMS(cms.getNotifications, notifications)
export const useAchievements = () => useCMS(cms.getAchievements, achievements)
export const useOfficeBearers = () => useCMS(cms.getOfficeBearers, officeBearers)
export const useGalleryEvents = () => useCMS(cms.getGalleryEvents, [] as never[])
export const usePrincipalMessage = () => useCMS(cms.getPrincipalMessage, { message: principalMessage })
export const useNavigation = () => useCMS(cms.getNavigation, navigation)
export const useStatistics = () => useCMS(cms.getStatistics, statistics)
export const useQuickLinks = () => useCMS(cms.getQuickLinks, quickLinks)
export const useHeroSection = () => useCMS(cms.getHeroSection, heroSection)
export const useFacilities = () => useCMS(cms.getFacilities, facilities)
export const useStudentLeaders = () => useCMS(cms.getStudentLeaders, studentLeaders)
export const useSchoolHistory = () => useCMS(cms.getSchoolHistory, schoolHistory)
export const useSchoolAnthem = () => useCMS(cms.getSchoolAnthem, schoolAnthem)
export const useBatchYears = () => useCMS(cms.getBatchYears, batchPhotos)
