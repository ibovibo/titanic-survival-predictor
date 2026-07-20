import { useLanguage } from '../i18n/LanguageContext'
import { Gauge } from './Gauge'
import styles from './ResultPanel.module.css'

interface Props {
  percent: number | null
  isLoading: boolean
  isWaking: boolean
  hasError: boolean
  onRetry: () => void
}

export function ResultPanel({ percent, isLoading, isWaking, hasError, onRetry }: Props) {
  const { t } = useLanguage()

  return (
    <div className={styles.panel}>
      <Gauge percent={percent} isLoading={isLoading} />

      {hasError ? (
        <div className={styles.errorBox}>
          <p className={styles.errorTitle}>{t.errorTitle}</p>
          <p className={styles.errorBody}>{t.errorBody}</p>
          <button type="button" className={styles.retryButton} onClick={onRetry}>
            {t.retry}
          </button>
        </div>
      ) : isWaking ? (
        <p className={styles.waking}>{t.waking}</p>
      ) : percent !== null ? (
        <p className={`${styles.sentence} tabular-nums`}>{t.resultSentence(String(Math.round(percent)))}</p>
      ) : null}
    </div>
  )
}
