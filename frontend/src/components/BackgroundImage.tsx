import styles from './BackgroundImage.module.css'

export function BackgroundImage() {
  return (
    <div className={styles.layer} aria-hidden="true">
      <div className={styles.photo} />
      <div className={styles.scrim} />
    </div>
  )
}
