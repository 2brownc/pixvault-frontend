import { Title, Text, Container, Overlay } from "@mantine/core"
import { Logo } from "../../components/logo/Logo"
import classes from "./Hero.module.css"
import { LoginInButton, SignUpButton } from "../../components/auth/Buttons"

export default function HeroImageBackground() {
  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          <Logo />
        </Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
            Pix Vault is a treasure trove of high-quality stock images that will
            elevate your creative projects to the next level. Whether you're a
            seasoned designer, a passionate blogger, or a social media whiz, we
            have the perfect visuals to bring your ideas to life.
          </Text>
        </Container>

        <div className={classes.controls}>
          <div className={classes.control}>
            <LoginInButton />
          </div>
          <div className={classes.control}>
            <SignUpButton />
          </div>
        </div>
      </div>
    </div>
  )
}
