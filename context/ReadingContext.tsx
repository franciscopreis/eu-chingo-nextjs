'use client'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react'
import type {
  Line,
  BinaryMatchHexagramRawOutput,
} from '@/lib/hexagram/hexagramTypes'

interface ReadingContextType {
  question: string
  setQuestion: (question: string) => void
  notes: string
  setNotes: (notes: string) => void
  lines: Line[] | null
  setLines: (lines: Line[] | null) => void
  hexagrams: BinaryMatchHexagramRawOutput | null
  setHexagrams: (hexagrams: BinaryMatchHexagramRawOutput | null) => void
  clearReading: () => void
  saveToLocalStorageNow: () => void // 👈 novo método
}

const ReadingContext = createContext<ReadingContextType | undefined>(undefined)

export function ReadingProvider({ children }: { children: ReactNode }) {
  const [question, setQuestion] = useState('')
  const [notes, setNotes] = useState('')
  const [lines, setLines] = useState<Line[] | null>(null)
  const [hexagrams, setHexagrams] =
    useState<BinaryMatchHexagramRawOutput | null>(null)
  const [hydrated, setHydrated] = useState(false)

  // Hidratar do localStorage
  useEffect(() => {
    try {
      const guestReading = localStorage.getItem('guestReading')
      if (guestReading) {
        const data = JSON.parse(guestReading)
        setQuestion(data.question || '')
        setNotes(data.notes || '')
        setLines(data.lines || null)
        setHexagrams(data.hexagrams || null)
      }
    } catch (err) {
      console.error('Erro ao recuperar leitura:', err)
    } finally {
      setHydrated(true)
    }
  }, [])

  // Persistir automaticamente (depois de montado)
  useEffect(() => {
    if (!hydrated) return

    const hasData =
      (question && question.trim() !== '') ||
      (notes && notes.trim() !== '') ||
      (lines && lines.length > 0) ||
      !!hexagrams

    if (hasData) {
      const readingData = { question, notes, lines, hexagrams }
      try {
        localStorage.setItem('guestReading', JSON.stringify(readingData))
      } catch (err) {
        console.error('Erro ao gravar leitura no localStorage:', err)
      }
    } else {
      localStorage.removeItem('guestReading')
    }
  }, [hydrated, question, notes, lines, hexagrams])

  // Grava imediatamente (usado antes de redirect/login)
  const saveToLocalStorageNow = useCallback(() => {
    try {
      const readingData = { question, notes, lines, hexagrams }
      localStorage.setItem('guestReading', JSON.stringify(readingData))
      console.log('[save guestReading ->', readingData)
    } catch (err) {
      console.error('Erro ao gravar leitura no localStorage:', err)
    }
  }, [question, notes, lines, hexagrams])

  // Limpa tudo
  const clearReading = () => {
    setQuestion('')
    setNotes('')
    setLines(null)
    setHexagrams(null)
    localStorage.removeItem('guestReading')
  }

  return (
    <ReadingContext.Provider
      value={{
        question,
        setQuestion,
        notes,
        setNotes,
        lines,
        setLines,
        hexagrams,
        setHexagrams,
        clearReading,
        saveToLocalStorageNow, // 👈 incluído aqui
      }}
    >
      {children}
    </ReadingContext.Provider>
  )
}

export const useReading = () => {
  const context = useContext(ReadingContext)
  if (context === undefined) {
    throw new Error('useReading must be used within a ReadingProvider')
  }
  return context
}
