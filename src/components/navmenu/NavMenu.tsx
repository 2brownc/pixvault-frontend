import { useState } from "react"
import {
  IconHome,
  IconSearch,
  IconUserCircle,
  IconStarFilled,
  IconHistory,
  IconLogout,
} from "@tabler/icons-react"
import router from "../../router"
import classes from "./NavMenu.module.css"

const data = [
  { link: "/", label: "Home", icon: IconHome },
  { link: "/search/keyword/weather", label: "Search", icon: IconSearch },
  { link: "/profile", label: "Profile", icon: IconUserCircle },
  { link: "/favorites", label: "Favorites", icon: IconStarFilled },
  { link: "/history", label: "History", icon: IconHistory },
]

export function NavMenu({
  opened,
  toggle,
}: {
  opened: boolean
  toggle: () => void
}) {
  const [active, setActive] = useState("Billing")

  const links = data.map(item => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={event => {
        event.preventDefault()
        setActive(item.label)
        router.navigate(item.link)
        toggle()
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ))

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>

      <div className={classes.footer}>
        <a
          href="/logout"
          className={classes.link}
          onClick={event => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  )
}
