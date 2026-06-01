import { createContext, useContext, useEffect, useState } from 'react'

const LanguageContext = createContext({ lang: 'en', setLang: () => {} })

const read = () => {
  if (typeof localStorage === 'undefined') return 'en'
  const saved = localStorage.getItem('lang')
  return saved === 'ne' || saved === 'en' ? saved : 'en'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(read)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('lang', lang)
    } catch {
      /* ignore */
    }
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
