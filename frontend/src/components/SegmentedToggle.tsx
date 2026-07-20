import styles from './SegmentedToggle.module.css'

interface Option<T> {
  value: T
  label: string
}

interface Props<T> {
  legendId: string
  legendLabel: string
  options: readonly [Option<T>, Option<T>]
  value: T
  onChange: (value: T) => void
}

export function SegmentedToggle<T extends string | boolean>({
  legendId,
  legendLabel,
  options,
  value,
  onChange,
}: Props<T>) {
  const activeIndex = options.findIndex((option) => option.value === value)

  return (
    <div className={styles.field}>
      <span className={styles.label} id={legendId}>
        {legendLabel}
      </span>
      <div className={styles.track} role="radiogroup" aria-labelledby={legendId}>
        <div className={`${styles.thumb} ${activeIndex === 1 ? styles.thumbRight : ''}`} aria-hidden="true" />
        {options.map((option) => (
          <button
            key={String(option.value)}
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
