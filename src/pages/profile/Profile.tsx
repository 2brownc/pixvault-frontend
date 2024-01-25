import { useAuth0 } from "@auth0/auth0-react"
import Loading from "../../components/loading/Loading"

export default function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <Loading width="auto" />
  }

  if (!isAuthenticated) {
    return <div>Not authenticated :(</div>
  }
  return (
    <div>
      Profile
      {user && (
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      )}
    </div>
  )
}
