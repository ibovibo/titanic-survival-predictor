import { useLanguage } from '../i18n/LanguageContext'
import styles from './Footer.module.css'

const REPO_URL = 'https://github.com/ibovibo/titanic-survival-predictor'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className={styles.footer}>
      <p className={styles.row}>
        <span>{t.footerAccuracy}</span>
        <span className={styles.dot} aria-hidden="true" />
        <span>{t.footerAlgorithm}</span>
        <span className={styles.dot} aria-hidden="true" />
        <span>{t.footerDataset}</span>
      </p>
      <a className={styles.link} href={REPO_URL} target="_blank" rel="noreferrer">
        {t.footerRepo} ↗
      </a>
    </footer>
  )
}
