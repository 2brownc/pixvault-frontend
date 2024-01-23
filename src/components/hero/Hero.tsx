import cx from "clsx"
import { Title, Text, Container, Button, Overlay } from "@mantine/core"
import { Logo } from "../../components/logo/Logo"
import classes from "./Hero.module.css"

export default function HeroImageBackground() {
  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          <Logo size="48px" />
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
          <Button className={classes.control} variant="white" size="lg">
            Sign Up
          </Button>
          <Button
            className={cx(classes.control, classes.secondaryControl)}
            size="lg"
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  )
}
