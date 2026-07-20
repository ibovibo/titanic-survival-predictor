import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './App.module.css'
import { fetchPrediction } from './api'
import { BackgroundImage } from './components/BackgroundImage'
import { Footer } from './components/Footer'
import { LanguageSwitch } from './components/LanguageSwitch'
import { PassengerForm } from './components/PassengerForm'
import { ResultPanel } from './components/ResultPanel'
import { useDebouncedValue } from './hooks/useDebouncedValue'
import { LanguageProvider, useLanguage } from './i18n/LanguageContext'
import type { PassengerFormState, PassengerProfile } from './types'

const DEFAULT_FORM: PassengerFormState = {
  pclass: 2,
  sex: 'female',
  age: 29,
  hasSpouse: false,
  siblings: 0,
  parents: 0,
  children: 0,
  fare: 32,
  embarked: 'S',
}

const WAKING_THRESHOLD_MS = 2500

function AppContent() {
  const { t } = useLanguage()
  const [form, setForm] = useState<PassengerFormState>(DEFAULT_FORM)
  const [percent, setPercent] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isWaking, setIsWaking] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [retryToken, setRetryToken] = useState(0)

  const debouncedForm = useDebouncedValue(form, 250)

  const debouncedProfile: PassengerProfile = useMemo(
    () => ({
      pclass: debouncedForm.pclass,
      sex: debouncedForm.sex,
      age: debouncedForm.age,
      sibsp: (debouncedForm.hasSpouse ? 1 : 0) + debouncedForm.siblings,
      parch: debouncedForm.parents + debouncedForm.children,
      fare: debouncedForm.fare,
      embarked: debouncedForm.embarked,
    }),
    [debouncedForm],
  )

  const requestIdRef = useRef(0)
  const firstRequestDoneRef = useRef(false)

  useEffect(() => {
    const controller = new AbortController()
    const requestId = ++requestIdRef.current
    setIsLoading(true)
    setHasError(false)

    let wakingTimer: number | undefined
    if (!firstRequestDoneRef.current) {
      wakingTimer = window.setTimeout(() => setIsWaking(true), WAKING_THRESHOLD_MS)
    }

    fetchPrediction(debouncedProfile, controller.signal)
      .then((data) => {
        if (requestId !== requestIdRef.current) return
        setPercent(data.survival_probability * 100)
        setHasError(false)
        firstRequestDoneRef.current = true
      })
      .catch(() => {
        if (controller.signal.aborted) return
        if (requestId !== requestIdRef.current) return
        setHasError(true)
        firstRequestDoneRef.current = true
      })
      .finally(() => {
        if (wakingTimer) window.clearTimeout(wakingTimer)
        if (requestId === requestIdRef.current) {
          setIsLoading(false)
          setIsWaking(false)
        }
      })

    return () => {
      controller.abort()
      if (wakingTimer) window.clearTimeout(wakingTimer)
    }
  }, [debouncedProfile, retryToken])

  const updateField = <K extends keyof PassengerFormState>(key: K, value: PassengerFormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleRetry = () => setRetryToken((n) => n + 1)

  return (
    <>
      <BackgroundImage />
      <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.titleGroup}>
            <h1 className={styles.title}>{t.appTitle}</h1>
          </div>
          <LanguageSwitch />
        </header>

        <div className={styles.layout}>
          <PassengerForm form={form} onChange={updateField} />
          <div className={styles.resultColumn}>
            <ResultPanel
              percent={percent}
              isLoading={isLoading}
              isWaking={isWaking}
              hasError={hasError}
              onRetry={handleRetry}
            />
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}

export default App
