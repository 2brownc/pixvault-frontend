import { useState } from "react"
import type { Dispatch, SetStateAction } from "react"
import styles from "./FavButton.module.css"

// AnimatedButton component renders a button with animated state
type AnimatedButtonProps = {
  before: JSX.Element // Content to show before button is clicked
  after: JSX.Element // Content to show after button is clicked
  action: (
    enabled: boolean,
    setEnabled: Dispatch<SetStateAction<boolean>>, // Callback when button is clicked
  ) => void
  color: string // Button text color
}

export default function AnimatedButton({
  before,
  after,
  action,
  color,
}: AnimatedButtonProps) {
  const [enabled, setEnabled] = useState<boolean>(false)

  const handleClick = () => {
    action(enabled, setEnabled)
  }

  return (
    <span className={styles.btnGroup}>
      {/* Main button */}
      <button className={styles.btn} onClick={handleClick} style={{ color }}>
        {enabled ? after : before}
      </button>

      {/* Animated copy button */}
      <button
        className={`${styles.btn} ${styles.btnCopy} ${enabled && styles.btnAnimated}`}
        style={{ color }}
      >
        {after}
      </button>
    </span>
  )
}
