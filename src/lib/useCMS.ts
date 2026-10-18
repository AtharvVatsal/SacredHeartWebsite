import { useState, useEffect, useRef } from 'react'
import * as cms from './cms'
import type { Facility, StudentLeader, BatchYear } from '@/types'
import {
  facilities as defaultFacilities,
  studentLeaders as defaultStudentLeaders,
  schoolHistory as defaultSchoolHistory,
  schoolAnthem as defaultSchoolAnthem,
  batchYears as defaultBatchYears
} from '@/data/school'

export function useCMS<T>(fetchFn: () => Promise<T>, defaultValue: T) {
  const [data, setData] = useState<T>(defaultValue)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Hold the latest defaultValue in a ref so we can use it inside the
  // effect without making it a dependency. Otherwise, callers that pass
  // an inline object literal recreate the reference every render and the
  // effect would re-fire on each render — pinning the CPU and starving
  // user input events (clicks, navigation).
  const defaultValueRef = useRef(defaultValue)
  defaultValueRef.current = defaultValue

  useEffect(() => {
    let mounted = true

    async function load() {
      try {
        setLoading(true)
        const result = await fetchFn()
        if (mounted) {
          setData(result)
          setError(null)
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load data')
          setData(defaultValueRef.current)
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      mounted = false
    }
  }, [fetchFn])

  return { data, loading, error }
}

// Convenience hooks for each data type
export function useSchoolInfo() {
  return useCMS(cms.getSchoolInfo, {
    name: 'Sacred Heart Sr. Sec. School',
    fullName: 'Sacred Heart Senior Secondary School',
    tagline: 'Nurturing Hearts, Shaping Futures',
    affiliation: 'CISCE, New Delhi',
    established: 1969,
    management: 'Sisters of Charity of Jesus and Mary',
    address: {
      street: 'P.O. Sidhpur',
      tehsil: 'Dharamshala',
      district: 'Kangra',
      state: 'Himachal Pradesh',
      pincode: '176057',
      country: 'India'
    },
    contact: {
      emails: ['scjmshs.sidhpur@gmail.com'],
      phones: ['01892-222428', '86290-99633'],
      addresses: []
    }
  })
}

export function useStaff() {
  return useCMS(cms.getStaff, [])
}

export function useNotifications() {
  return useCMS(cms.getNotifications, [])
}

export function useAchievements() {
  return useCMS(cms.getAchievements, [])
}

export function useClass10Toppers() {
  return useCMS(cms.getClass10Toppers, [])
}

export function useClass12Toppers() {
  return useCMS(cms.getClass12Toppers, [])
}

export function useOfficeBearers() {
  return useCMS(cms.getOfficeBearers, [])
}

export function useGalleryEvents() {
  return useCMS(cms.getGalleryEvents, [])
}

export function usePrincipalMessage() {
  return useCMS(cms.getPrincipalMessage, { message: '' })
}

export function useNavigation() {
  return useCMS(cms.getNavigation, [])
}

export function useStatistics() {
  return useCMS(cms.getStatistics, [])
}

export function useQuickLinks() {
  return useCMS(cms.getQuickLinks, [])
}

export function useHeroSection() {
  return useCMS(cms.getHeroSection, {
    title: '',
    subtitle: '',
    ctaText: '',
    ctaLink: ''
  })
}

export function useFacilities() {
  return useCMS<Facility[]>(cms.getFacilities, defaultFacilities)
}

export function useStudentLeaders() {
  return useCMS<StudentLeader[]>(cms.getStudentLeaders, defaultStudentLeaders)
}

export function useSchoolHistory() {
  return useCMS(cms.getSchoolHistory, defaultSchoolHistory)
}

export function useSchoolAnthem() {
  return useCMS(cms.getSchoolAnthem, defaultSchoolAnthem)
}

export function useBatchYears() {
  return useCMS<BatchYear[]>(cms.getBatchYears, defaultBatchYears.map((year: number) => ({
    year,
    photos: []
  })))
}
