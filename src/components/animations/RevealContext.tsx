'use client'

import { createContext, useContext } from 'react'

/**
 * When true, scroll-triggered entrance animations show their content straight away. Only the visual editor's
 * canvas turns this on (its iframe does not report visibility reliably); the public site leaves it false.
 */
export const RevealAllContext = createContext(false)

export const useRevealAll = () => useContext(RevealAllContext)
