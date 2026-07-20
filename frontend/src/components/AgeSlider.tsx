import { useLanguage } from '../i18n/LanguageContext'
import { Slider } from './Slider'

interface Props {
  value: number
  onChange: (value: number) => void
}

const MIN = 0
const MAX = 80

export function AgeSlider({ value, onChange }: Props) {
  const { t } = useLanguage()
  const percent = ((value - MIN) / (MAX - MIN)) * 100

  return (
    <Slider
      label={t.ageLabel}
      valueLabel={`${value}`}
      min={MIN}
      max={MAX}
      step={1}
      rawValue={value}
      percent={percent}
      onChange={onChange}
      ariaLabel={t.ageLabel}
    />
  )
}
