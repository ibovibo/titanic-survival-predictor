import { useLanguage } from '../i18n/LanguageContext'
import { SegmentedToggle } from './SegmentedToggle'

interface Props {
  value: boolean
  onChange: (value: boolean) => void
}

export function SpouseToggle({ value, onChange }: Props) {
  const { t } = useLanguage()

  return (
    <SegmentedToggle
      legendId="spouse-label"
      legendLabel={t.spouseLabel}
      options={[
        { value: true, label: t.spouseYes },
        { value: false, label: t.spouseNo },
      ]}
      value={value}
      onChange={onChange}
    />
  )
}
