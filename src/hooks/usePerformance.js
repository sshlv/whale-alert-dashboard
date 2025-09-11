import { useState, useEffect, useCallback, useMemo } from 'react'

// Hook pour optimiser les performances
export const usePerformance = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const withLoading = useCallback(async (asyncFunction) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await asyncFunction()
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { isLoading, error, withLoading }
}

// Hook pour debouncer les valeurs
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Hook pour optimiser les re-renders
export const useOptimizedState = (initialState) => {
  const [state, setState] = useState(initialState)

  const optimizedSetState = useCallback((newState) => {
    setState(prevState => {
      // Éviter les re-renders inutiles
      if (JSON.stringify(prevState) === JSON.stringify(newState)) {
        return prevState
      }
      return newState
    })
  }, [])

  return [state, optimizedSetState]
}

// Hook pour gérer la pagination
export const usePagination = (data, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1)

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    return data.slice(start, end)
  }, [data, currentPage, itemsPerPage])

  const totalPages = useMemo(() => 
    Math.ceil(data.length / itemsPerPage), 
    [data.length, itemsPerPage]
  )

  const goToPage = useCallback((page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }, [totalPages])

  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }, [currentPage, totalPages])

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }, [currentPage])

  return {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
    nextPage,
    prevPage,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1
  }
}

// Hook pour optimiser les appels API
export const useApiCache = () => {
  const [cache, setCache] = useState(new Map())

  const getCachedData = useCallback((key) => {
    const cached = cache.get(key)
    if (cached && Date.now() - cached.timestamp < 300000) { // 5 minutes
      return cached.data
    }
    return null
  }, [cache])

  const setCachedData = useCallback((key, data) => {
    setCache(prev => new Map(prev).set(key, {
      data,
      timestamp: Date.now()
    }))
  }, [])

  const clearCache = useCallback(() => {
    setCache(new Map())
  }, [])

  return { getCachedData, setCachedData, clearCache }
}
