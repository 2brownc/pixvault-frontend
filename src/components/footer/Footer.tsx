import { Container, Group, ActionIcon, rem } from "@mantine/core"
import {
	IconBrandTwitter,
	IconBrandYoutube,
	IconBrandInstagram,
} from "@tabler/icons-react"
import { Logo } from "../logo/Logo"
import classes from "./Footer.module.css"

export default function Footer() {
	return (
		<div
			className={classes.footer}
			style={{ background: "linear-gradient(to bottom, #f5f8ff, #d0d9e9)" }}
		>
			<Container className={classes.inner}>
				<div className={classes.logo}>
					<Logo />
				</div>
				<Group
					gap={0}
					className={classes.links}
					justify="flex-end"
					wrap="nowrap"
				>
					<a href="https://twitter.com/" target="_blank" rel="noreferrer">
						<ActionIcon size="lg" color="gray" variant="subtle">
							<IconBrandTwitter
								style={{ width: rem(18), height: rem(18) }}
								stroke={1.5}
							/>
						</ActionIcon>
					</a>

					<a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
						<ActionIcon size="lg" color="gray" variant="subtle">
							<IconBrandYoutube
								style={{ width: rem(18), height: rem(18) }}
								stroke={1.5}
							/>
						</ActionIcon>
					</a>

					<a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
						<ActionIcon size="lg" color="gray" variant="subtle">
							<IconBrandInstagram
								style={{ width: rem(18), height: rem(18) }}
								stroke={1.5}
							/>
						</ActionIcon>
					</a>
				</Group>
			</Container>
		</div>
	)
}
