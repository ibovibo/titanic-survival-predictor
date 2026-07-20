import { useLanguage } from '../i18n/LanguageContext'
import type { PassengerClass } from '../types'
import styles from './ClassSelector.module.css'

interface Props {
  value: PassengerClass
  onChange: (value: PassengerClass) => void
}

export function ClassSelector({ value, onChange }: Props) {
  const { t } = useLanguage()

  const options: { value: PassengerClass; label: string }[] = [
    { value: 1, label: t.class1 },
    { value: 2, label: t.class2 },
    { value: 3, label: t.class3 },
  ]

  return (
    <div className={styles.field}>
      <span className={styles.label} id="class-label">
        {t.classLabel}
      </span>
      <div className={styles.row} role="radiogroup" aria-labelledby="class-label">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={value === option.value}
            className={`${styles.card} ${value === option.value ? styles.cardActive : ''}`}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
