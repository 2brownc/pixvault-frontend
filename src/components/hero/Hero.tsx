import { Title, Text, Container, Overlay, Flex } from "@mantine/core";
import { Logo } from "../../components/logo/Logo";
import styles from "./Hero.module.css";
import {
  DemoAccountDetails,
  LoginButton,
  SignUpButton,
} from "../../components/auth/Buttons";
import { useAppSelector } from "../../app/hooks";
import { selectId } from "../../features/user/userSlice";

export default function HeroImageBackground() {
  const userId = useAppSelector(selectId);
  return (
    <div className={styles.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={styles.inner}>
        <Title className={styles.title}>
          <Logo />
        </Title>

        <Container size={640}>
          <Text size="lg" className={styles.description}>
            Pix Vault is a treasure trove of high-quality stock images that will
            elevate your creative projects to the next level. Whether you're a
            seasoned designer, a passionate blogger, or a social media whiz, we
            have the perfect visuals to bring your ideas to life.
          </Text>
        </Container>

        {!userId && (
          <div className={styles.controls}>
            <Flex
              justify="center"
              align="center"
              direction={{ base: "column", md: "row" }}
              wrap="wrap"
              gap="md"
            >
              <LoginButton />

              <SignUpButton />

              <DemoAccountDetails />
            </Flex>
          </div>
        )}
      </div>
    </div>
  );
}
