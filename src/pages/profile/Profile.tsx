import { useAuth0 } from "@auth0/auth0-react"
import Loading from "../../components/loading/Loading"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { updateUser } from "../../features/user/userSlice"
import {
  selectName,
  selectId,
  selectHistory,
  selectFavorites,
} from "../../features/user/userSlice"
import { useEffect } from "react"

export default function Profile() {
  const dispatch = useAppDispatch()

  const userName = useAppSelector(selectName)
  const userId = useAppSelector(selectId)
  const userHistory = useAppSelector(selectHistory)
  const userFavorites = useAppSelector(selectFavorites)
  const accountLoading = useAppSelector(state => state.user.accountLoading)

  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0()

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      const userId = user?.sub
      if (userId !== undefined) {
        getAccessTokenSilently().then(accessToken => {
          dispatch(updateUser({ userId, accessToken }))
        })
      }
    }
  }, [isLoading, isAuthenticated, user, getAccessTokenSilently, dispatch])

  useEffect(() => {
    console.log(
      "User profile from state:",
      userName,
      userId,
      userHistory,
      userFavorites,
    )
  }, [userName, userId, userHistory, userFavorites])

  useEffect(() => {
    console.log("Account status: ", accountLoading)
  }, [accountLoading])

  if (isLoading) {
    return <Loading width="auto" />
  }

  if (!isAuthenticated) {
    return <div>Not authenticated :(</div>
  }

  return (
    <>
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
      <div>
        {userName && <h1>userName: {userName}</h1>}
        {userId && <h1>userId: {userId}</h1>}
        <h1>userName: {userName}</h1>
        <h1>userId: {userId}</h1>
      </div>
    </>
  )
}
