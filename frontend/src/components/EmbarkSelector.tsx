import { useLanguage } from '../i18n/LanguageContext'
import type { Embarked } from '../types'
import styles from './EmbarkSelector.module.css'

interface Props {
  value: Embarked
  onChange: (value: Embarked) => void
}

export function EmbarkSelector({ value, onChange }: Props) {
  const { t } = useLanguage()

  const options: { value: Embarked; label: string }[] = [
    { value: 'S', label: t.embarkedS },
    { value: 'C', label: t.embarkedC },
    { value: 'Q', label: t.embarkedQ },
  ]

  return (
    <div className={styles.field}>
      <span className={styles.label} id="embarked-label">
        {t.embarkedLabel}
      </span>
      <div className={styles.row} role="radiogroup" aria-labelledby="embarked-label">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={value === option.value}
            className={`${styles.option} ${value === option.value ? styles.optionActive : ''}`}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
