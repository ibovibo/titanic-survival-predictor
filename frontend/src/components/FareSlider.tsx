import { useLanguage } from '../i18n/LanguageContext'
import { fareToSlider, sliderToFare } from '../utils/scale'
import { Slider } from './Slider'

interface Props {
  value: number
  onChange: (value: number) => void
}

const STEPS = 1000

export function FareSlider({ value, onChange }: Props) {
  const { t } = useLanguage()
  const rawValue = Math.round(fareToSlider(value) * STEPS)

  return (
    <Slider
      label={t.fareLabel}
      valueLabel={`£${value}`}
      min={0}
      max={STEPS}
      step={1}
      rawValue={rawValue}
      percent={(rawValue / STEPS) * 100}
      onChange={(raw) => onChange(sliderToFare(raw / STEPS))}
      ariaLabel={t.fareLabel}
    />
  )
}
