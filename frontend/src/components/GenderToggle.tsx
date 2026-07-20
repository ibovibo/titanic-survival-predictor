import { useLanguage } from '../i18n/LanguageContext'
import type { Sex } from '../types'
import { SegmentedToggle } from './SegmentedToggle'

interface Props {
  value: Sex
  onChange: (value: Sex) => void
}

export function GenderToggle({ value, onChange }: Props) {
  const { t } = useLanguage()

  return (
    <SegmentedToggle
      legendId="sex-label"
      legendLabel={t.sexLabel}
      options={[
        { value: 'female', label: t.sexFemale },
        { value: 'male', label: t.sexMale },
      ]}
      value={value}
      onChange={onChange}
    />
  )
}
