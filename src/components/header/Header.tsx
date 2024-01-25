import { Menu, Group, Center, Burger, Container } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconChevronDown } from "@tabler/icons-react"
import classes from "./Header.module.css"
import { NavMenu } from "../navmenu/NavMenu"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import { Logo } from "../logo/Logo"
import { isCurrentPage } from "../../utils/navigation"

const links = [
  { link: "/", label: "Home" },
  {
    link: `/search/keyword/${import.meta.env.VITE_DEFAULT_SEARCHTERM}`,
    label: "Search",
  },
  {
    link: "#1",
    label: "Profile",
    links: [
      { link: "/profile", label: "Profile" },
      { link: "/favorites", label: "Favorites" },
      { link: "/history", label: "History" },
      { link: "", label: "Logout" },
    ],
  },
]

export default function Header() {
  const { isAuthenticated, logout } = useAuth0()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const logoutAction = () => {
    logout({ logoutParams: { returnTo: window.location.origin } })
  }

  const [opened, { toggle }] = useDisclosure(false)

  const navigateTo = (path: string) => {
    navigate(path)
  }

  const clickAction = (item: any) => {
    if (item.label === "Logout") {
      logoutAction()
    } else {
      navigateTo(item.link)
    }
  }

  const items = links.map(link => {
    const menuItems = link.links?.map(item => (
      <Menu.Item
        key={item.link}
        onClick={() => clickAction(item)}
        data-active={isCurrentPage(item.link, pathname)}
      >
        {item.label}
      </Menu.Item>
    ))

    if (menuItems) {
      if (link.label === "Profile" && !isAuthenticated) {
        return undefined
      }
      return (
        <Menu
          key={link.label}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <span
              className={classes.link}
              data-active={isCurrentPage(link.link, pathname)}
              onClick={() => clickAction(link.link)}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </span>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      )
    }

    return (
      <span
        key={link.label}
        className={classes.link}
        onClick={() => clickAction(link)}
        data-active={isCurrentPage(link.link, pathname)}
      >
        {link.label}
      </span>
    )
  })

  return (
    <>
      <header className={classes.header}>
        <Container size="md">
          <div className={classes.inner}>
            <div>
              <span className={classes.logo} onClick={() => navigate("/")}>
                <Logo />
              </span>
            </div>
            <Group gap={5} visibleFrom="sm">
              {items}
            </Group>
            <Burger
              opened={opened}
              onClick={toggle}
              size="sm"
              hiddenFrom="sm"
            />
          </div>
        </Container>
      </header>
      {opened && <NavMenu opened={opened} toggle={toggle} />}
    </>
  )
}
