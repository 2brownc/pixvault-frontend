import { Button } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";

export function LoginButtonUnstyled({
  component,
}: {
  component: "symbol" | undefined;
}) {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      w={{ base: "200px", md: "auto" }}
      onClick={() => loginWithRedirect()}
      component={component}
    >
      Login In
    </Button>
  );
}

export function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      w={{ base: "200px", md: "auto" }}
      onClick={() => loginWithRedirect()}
    >
      Login In
    </Button>
  );
}

export function SignUpButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      w={{ base: "200px", md: "auto" }}
      onClick={() => loginWithRedirect()}
    >
      Sign Up
    </Button>
  );
}

export function LogOutButton() {
  const { logout } = useAuth0();

  return (
    <Button
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log Out
    </Button>
  );
}

export function DemoAccountDetails() {
  return (
    <Button
      color="#367588"
      w={{ base: "200px", md: "auto" }}
      component="a"
      href="/demoaccount"
      target="_blank"
    >
      Demo Account
    </Button>
  );
}
