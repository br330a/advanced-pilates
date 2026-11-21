import { useCallback, useState } from 'react'

const preferenceKey = 'advanced-studio-external-content-v1'

function savedPreference() {
  try {
    const value = window.localStorage.getItem(preferenceKey)
    return value === 'allow' || value === 'decline' ? value : null
  } catch {
    return null
  }
}

export function useExternalContentPreference() {
  const [preference, setPreference] = useState(savedPreference)
  const choose = useCallback((value) => {
    if (value !== 'allow' && value !== 'decline' && value !== null) return
    setPreference(value)
    try {
      if (value === null) window.localStorage.removeItem(preferenceKey)
      else window.localStorage.setItem(preferenceKey, value)
    } catch {
      // Navegação privada ou armazenamento bloqueado: a escolha vale nesta visita.
    }
  }, [])
  return [preference, choose]
}
