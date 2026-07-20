import { useLanguage } from '../i18n/LanguageContext'
import styles from './Stepper.module.css'

interface Props {
  label: string
  value: number
  min: number
  max: number
  onChange: (value: number) => void
}

export function Stepper({ label, value, min, max, onChange }: Props) {
  const { t } = useLanguage()

  return (
    <div className={styles.field}>
      <span className={styles.label}>{label}</span>
      <div className={styles.control}>
        <button
          type="button"
          className={styles.button}
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={t.decrease}
        >
          −
        </button>
        <span className={`${styles.count} tabular-nums`}>{value}</span>
        <button
          type="button"
          className={styles.button}
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={t.increase}
        >
          +
        </button>
      </div>
    </div>
  )
}
