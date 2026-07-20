import type { PassengerProfile, PredictResponse } from './types'

const API_URL = import.meta.env.VITE_API_URL ?? ''

export async function fetchPrediction(
  profile: PassengerProfile,
  signal: AbortSignal,
): Promise<PredictResponse> {
  const res = await fetch(`${API_URL}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile),
    signal,
  })

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`)
  }

  return res.json()
}
