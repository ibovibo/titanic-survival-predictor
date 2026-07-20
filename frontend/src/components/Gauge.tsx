import { useCountUp } from '../hooks/useCountUp'
import { gaugeColor } from '../utils/color'
import styles from './Gauge.module.css'

interface Props {
  percent: number | null
  isLoading: boolean
}

const SIZE = 220
const STROKE = 14
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function Gauge({ percent, isLoading }: Props) {
  const displayed = useCountUp(percent, 300)
  const clamped = percent ?? 0
  const offset = CIRCUMFERENCE - (clamped / 100) * CIRCUMFERENCE
  const color = gaugeColor(clamped)
  const dashoffset = percent === null ? CIRCUMFERENCE : offset

  return (
    <div className={`${styles.wrap} ${isLoading ? styles.pulsing : ''}`}>
      <svg className={styles.svg} width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <circle className={styles.track} cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} />
        <circle
          className={styles.glow}
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke={color}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashoffset}
        />
        <circle
          className={styles.progress}
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke={color}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashoffset}
        />
      </svg>
      <div className={styles.center}>
        {displayed === null ? (
          <span className={styles.percentDash}>—</span>
        ) : (
          <span className={`${styles.percent} tabular-nums`}>{Math.round(displayed)}%</span>
        )}
      </div>
    </div>
  )
}
