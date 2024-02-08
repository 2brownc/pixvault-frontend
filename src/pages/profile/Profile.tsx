import { useAuth0 } from "@auth0/auth0-react"
import Loading from "../../components/loading/Loading"
import { getProfile } from "../../utils/user"
import { useState, useEffect } from "react"
import type { User as UserProfile } from "../../types"

export default function Profile() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)

  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0()

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      const userId = user?.sub
      if (userId !== undefined) {
        getAccessTokenSilently().then(accessToken => {
          getProfile(userId, accessToken).then(result => {
            if (result !== null) {
              setUserProfile(result)
            }
          })
        })
      }
    }
  }, [isLoading, isAuthenticated, user, getAccessTokenSilently])

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
