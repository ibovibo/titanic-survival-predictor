import { useLanguage } from '../i18n/LanguageContext'
import type { PassengerFormState } from '../types'
import { AgeSlider } from './AgeSlider'
import { ClassSelector } from './ClassSelector'
import { EmbarkSelector } from './EmbarkSelector'
import { FareSlider } from './FareSlider'
import { GenderToggle } from './GenderToggle'
import styles from './PassengerForm.module.css'
import { SpouseToggle } from './SpouseToggle'
import { Stepper } from './Stepper'

interface Props {
  form: PassengerFormState
  onChange: <K extends keyof PassengerFormState>(key: K, value: PassengerFormState[K]) => void
}

export function PassengerForm({ form, onChange }: Props) {
  const { t } = useLanguage()

  return (
    <div className={styles.form}>
      <ClassSelector value={form.pclass} onChange={(v) => onChange('pclass', v)} />
      <GenderToggle value={form.sex} onChange={(v) => onChange('sex', v)} />
      <AgeSlider value={form.age} onChange={(v) => onChange('age', v)} />

      <div className={styles.row}>
        <SpouseToggle value={form.hasSpouse} onChange={(v) => onChange('hasSpouse', v)} />
        <Stepper
          label={t.siblingsLabel}
          value={form.siblings}
          min={0}
          max={8}
          onChange={(v) => onChange('siblings', v)}
        />
      </div>

      <div className={styles.row}>
        <Stepper
          label={t.parentsLabel}
          value={form.parents}
          min={0}
          max={2}
          onChange={(v) => onChange('parents', v)}
        />
        <Stepper
          label={t.childrenLabel}
          value={form.children}
          min={0}
          max={6}
          onChange={(v) => onChange('children', v)}
        />
      </div>

      <FareSlider value={form.fare} onChange={(v) => onChange('fare', v)} />
      <EmbarkSelector value={form.embarked} onChange={(v) => onChange('embarked', v)} />
    </div>
  )
}
