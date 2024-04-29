// ScrollToTopButton.tsx
/*
import { useState, useEffect } from "react"
import { IconArrowUp } from "@tabler/icons-react"
import { ActionIcon } from "@mantine/core"
import styles from "./ScrollToTop.module.css"

export default function ScrollToTop({
  showButtonAfterScroll = 300,
}: {
  showButtonAfterScroll?: number
}) {
  const [isButtonVisible, setIsButtonVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsButtonVisible(window.scrollY > showButtonAfterScroll)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [showButtonAfterScroll])

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }

  return (
    <span
      className={`${styles.scrollToTopButton} ${isButtonVisible ? styles.visible : ""}`}
    >
      <ActionIcon
        onClick={handleScrollToTop}
        variant="filled"
        size="xl"
        radius="lg"
        aria-label="scroll to top"
      >
        <IconArrowUp style={{ width: "70%", height: "70%" }} stroke={1.5} />
      </ActionIcon>
    </span>
  )
}
*/

import { IconArrowUp } from "@tabler/icons-react"
import { useWindowScroll } from "@mantine/hooks"
import { Affix, Button, Transition, rem } from "@mantine/core"

export default function ScrollToTop() {
	const [scroll, scrollTo] = useWindowScroll()

	return (
		<Affix position={{ bottom: 20, right: 20 }}>
			<Transition transition="slide-up" mounted={scroll.y > 350}>
				{(transitionStyles) => (
					<Button style={transitionStyles} onClick={() => scrollTo({ y: 0 })}>
						<IconArrowUp style={{ width: rem(16), height: rem(16) }} />
					</Button>
				)}
			</Transition>
		</Affix>
	)
}
