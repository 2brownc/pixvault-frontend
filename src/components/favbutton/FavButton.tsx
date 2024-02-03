import { useState } from "react"
import styles from "./FavButton.module.css"

type AnimatedButtonProps = {
  before: JSX.Element
  after: JSX.Element
  action: () => void
  color: string
}

export default function AnimatedButton({
  before,
  after,
  action,
  color,
}: AnimatedButtonProps) {
  const [enabled, setEnabled] = useState<boolean>(false)
  const handleClick = () => {
    setEnabled(enabled => !enabled)
    action()
  }
  return (
    <span className={styles.btnGroup}>
      <button className={styles.btn} onClick={handleClick} style={{ color }}>
        {enabled ? after : before}
      </button>

      <button
        className={`${styles.btn} ${styles.btnCopy} ${enabled && styles.btnAnimated}`}
        style={{ color }}
      >
        {after}
      </button>
    </span>
  )
}
