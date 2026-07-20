interface RgbStop {
  pct: number
  rgb: [number, number, number]
}

const STOPS: RgbStop[] = [
  { pct: 0, rgb: [140, 44, 76] }, // cold, purplish red — var(--color-gauge-low)
  { pct: 50, rgb: [183, 163, 36] }, // muted cold yellow — var(--color-gauge-mid)
  { pct: 100, rgb: [33, 121, 92] }, // cool green — var(--color-gauge-high)
]

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function gaugeColor(percent: number): string {
  const p = Math.min(100, Math.max(0, percent))
  // Eased so red/green dominate most of their half, leaving only a narrow
  // band around 50% where the gradient passes through yellow — a linear
  // blend lingers in a muddy orange for too much of the low range.
  const [a, b, t] = p <= 50 ? [STOPS[0], STOPS[1], (p / 50) ** 2.2] : [STOPS[1], STOPS[2], 1 - (1 - (p - 50) / 50) ** 2.2]
  const r = Math.round(lerp(a.rgb[0], b.rgb[0], t))
  const g = Math.round(lerp(a.rgb[1], b.rgb[1], t))
  const bl = Math.round(lerp(a.rgb[2], b.rgb[2], t))
  return `rgb(${r}, ${g}, ${bl})`
}
