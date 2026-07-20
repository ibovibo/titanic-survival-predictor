import styles from './Slider.module.css'

interface Props {
  label: string
  valueLabel: string
  min: number
  max: number
  step: number
  rawValue: number
  percent: number
  onChange: (raw: number) => void
  ariaLabel: string
}

export function Slider({ label, valueLabel, min, max, step, rawValue, percent, onChange, ariaLabel }: Props) {
  return (
    <div className={styles.field}>
      <div className={styles.headerRow}>
        <span className={styles.label}>{label}</span>
      </div>
      <div className={styles.trackWrap}>
        <div className={`${styles.bubble} tabular-nums`} style={{ left: `${percent}%` }}>
          {valueLabel}
        </div>
        <input
          type="range"
          className={styles.input}
          style={{ '--fill': `${percent}%` } as React.CSSProperties}
          min={min}
          max={max}
          step={step}
          value={rawValue}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={ariaLabel}
          aria-valuetext={valueLabel}
        />
      </div>
    </div>
  )
}
