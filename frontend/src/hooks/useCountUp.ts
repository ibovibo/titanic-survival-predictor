import { useEffect, useRef, useState } from 'react'

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3
}

export function useCountUp(target: number | null, durationMs = 300): number | null {
  const [displayed, setDisplayed] = useState(target)
  const frameRef = useRef<number>(0)
  const fromRef = useRef(target)

  useEffect(() => {
    if (target === null) {
      setDisplayed(null)
      return
    }

    const from = fromRef.current ?? target
    const start = performance.now()

    cancelAnimationFrame(frameRef.current)

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(1, elapsed / durationMs)
      const eased = easeOutCubic(progress)
      setDisplayed(from + (target - from) * eased)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        fromRef.current = target
      }
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, durationMs])

  return displayed
}
