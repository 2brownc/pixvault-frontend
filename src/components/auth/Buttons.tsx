import { Button } from "@mantine/core"
import { useAuth0 } from "@auth0/auth0-react"

export function LoginInButton() {
  const { loginWithRedirect } = useAuth0()

  return <Button onClick={() => loginWithRedirect()}>Login In</Button>
}

export function SignUpButton() {
  const { loginWithRedirect } = useAuth0()

  return <Button onClick={() => loginWithRedirect()}>Sign Up</Button>
}

export function LogOutButton() {
  const { logout } = useAuth0()

  return (
    <Button
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log Out
    </Button>
  )
}
