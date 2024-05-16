import {
	IconHome,
	IconSearch,
	IconUserCircle,
	IconStarFilled,
	IconHistory,
	IconLogout,
	IconLogin,
} from "@tabler/icons-react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import { isCurrentPage } from "../../utils/navigation"
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
	const { isAuthenticated, loginWithRedirect, logout } = useAuth0()
	const { pathname } = useLocation()
	const navigate = useNavigate()

	const showLink = (link: string) => {
		const securePage = ["/profile", "/favorites", "/history"].includes(link)
		if (securePage) {
			// if the link is secure only display link if the user is authenticated
			return isAuthenticated
		}

		// always display links to unsecure pages
		return true
	}

	const logoutAction = () => {
		logout({ logoutParams: { returnTo: window.location.origin } })
	}

	const links = data
		// links to secure pages are displayed only if the user is authenticated
		.filter((item) => showLink(item.link))
		.map((item) => (
			<a
				className={classes.link}
				data-active={isCurrentPage(item.link, pathname)}
				href={item.link}
				key={item.label}
				onClick={(event) => {
					event.preventDefault()
					navigate(item.link)
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
				{isAuthenticated && (
					<span
						className={classes.link}
						onClick={(event) => {
							event.preventDefault()
							logoutAction()
						}}
						onKeyDown={(event) => {
							if (event.key === "Enter") {
								logoutAction()
							}
						}}
					>
						<IconLogout className={classes.linkIcon} stroke={1.5} />
						<span>Logout</span>
					</span>
				)}

				{!isAuthenticated && (
					<span
						className={classes.link}
						onClick={(event) => {
							event.preventDefault()
							loginWithRedirect()
						}}
						onKeyDown={(event) => {
							if (event.key === "Enter") {
								loginWithRedirect()
							}
						}}
					>
						<IconLogin className={classes.linkIcon} stroke={1.5} />
						<span>Login</span>
					</span>
				)}
			</div>
		</nav>
	)
}
