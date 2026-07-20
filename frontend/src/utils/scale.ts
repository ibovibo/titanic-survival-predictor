const FARE_MAX = 512
const FARE_CURVE = 5

/** Maps a linear slider position [0,1] to a fare [0, FARE_MAX], concentrating
 * resolution at the low end where most historical fares actually fall. */
export function sliderToFare(t: number): number {
  const clamped = Math.min(1, Math.max(0, t))
  const fare = (FARE_MAX * (Math.exp(FARE_CURVE * clamped) - 1)) / (Math.exp(FARE_CURVE) - 1)
  return Math.round(fare)
}

export function fareToSlider(fare: number): number {
  const clamped = Math.min(FARE_MAX, Math.max(0, fare))
  return Math.log((clamped * (Math.exp(FARE_CURVE) - 1)) / FARE_MAX + 1) / FARE_CURVE
}
