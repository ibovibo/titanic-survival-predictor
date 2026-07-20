import { useLanguage } from '../i18n/LanguageContext'
import styles from './LanguageSwitch.module.css'

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className={styles.switch} role="group" aria-label="Language">
      <button
        type="button"
        className={`${styles.option} ${language === 'tr' ? styles.optionActive : ''}`}
        onClick={() => setLanguage('tr')}
        aria-pressed={language === 'tr'}
      >
        TR
      </button>
      <button
        type="button"
        className={`${styles.option} ${language === 'en' ? styles.optionActive : ''}`}
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
      >
        EN
      </button>
    </div>
  )
}
