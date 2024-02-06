import { useState } from "react"
import type { Dispatch, SetStateAction } from "react"
import styles from "./FavButton.module.css"
import type { ImageRecord } from "../../types"

type AnimatedButtonProps = {
  before: JSX.Element
  after: JSX.Element
  action: (setEnabled: Dispatch<SetStateAction<boolean>>) => void
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
    if (!enabled) {
      action(setEnabled)
    }
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
