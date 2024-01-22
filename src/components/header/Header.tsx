import { Menu, Group, Center, Burger, Container } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconChevronDown } from "@tabler/icons-react"
import classes from "./Header.module.css"
import { Link } from "react-router-dom"
import { NavMenu } from "../navmenu/NavMenu"

const links = [
  { link: "/", label: "Home" },
  { link: "/search/keyword/weather", label: "Search" },
  {
    link: "#1",
    label: "Profile",
    links: [
      { link: "/favorites", label: "Favorites" },
      { link: "/history", label: "History" },
    ],
  },
]

export default function Header() {
  const [opened, { toggle }] = useDisclosure(false)

  const items = links.map(link => {
    const menuItems = link.links?.map(item => (
      <Link to={item.link} key={item.link}>
        <Menu.Item>{item.label}</Menu.Item>
      </Link>
    ))

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <a href={link.link} className={classes.link}>
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      )
    }

    return (
      <a key={link.label} href={link.link} className={classes.link}>
        {link.label}
      </a>
    )
  })

  return (
    <>
      <header className={classes.header}>
        <Container size="md">
          <div className={classes.inner}>
            <div>PIX VAULT</div>
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
