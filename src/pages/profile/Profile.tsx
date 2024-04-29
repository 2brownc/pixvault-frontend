import { useAuth0 } from "@auth0/auth0-react"
import Loading from "../../components/loading/Loading"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { updateUser } from "../../features/user/userSlice"
import {
  selectName,
  selectId,
  selectHistory,
  selectFavorites,
  accountLoading,
} from "../../features/user/userSlice"
import { useState, useEffect, useCallback } from "react"
import { isRegisteredUser, registerUser } from "../../utils/user"
import { Container, Text } from "@mantine/core"
import ChangeName from "../../components/ChangeName/ChangeName"

export default function Profile() {
  const dispatch = useAppDispatch()

  const userName = useAppSelector(selectName)
  const userId = useAppSelector(selectId)
  const userHistory = useAppSelector(selectHistory)
  const userFavorites = useAppSelector(selectFavorites)
  const isAccountLoading = useAppSelector(accountLoading)

  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0()

  const [registered, setRegistered] = useState<boolean>(false)
  const [registrationError, setRegistrationError] = useState<boolean>(false)

  const refreshUserProfile = useCallback(
    (userId: string) => {
      getAccessTokenSilently().then(accessToken => {
        dispatch(updateUser({ userId, accessToken }))
      })
    },
    [dispatch, getAccessTokenSilently],
  )

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      const authUserId = user?.sub?.split("|")[1]
      if (authUserId !== undefined) {
        //check if user has updated the profile
        getAccessTokenSilently().then(accessToken => {
          isRegisteredUser(authUserId, accessToken).then(result => {
            setRegistered(result)
          })
        })
        // refresh user profile
        refreshUserProfile(authUserId)
      }
    }
  }, [
    isLoading,
    isAuthenticated,
    user,
    getAccessTokenSilently,
    dispatch,
    refreshUserProfile,
  ])

  if (isLoading) {
    return <Loading width="auto" />
  }

  if (!isAuthenticated) {
    return <div>Not authenticated :(</div>
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget as HTMLFormElement)
    const name = formData.get("name") as string
    const authUserId = user?.sub?.split("|")[1]

    if (authUserId && name) {
      getAccessTokenSilently().then(accessToken => {
        registerUser(authUserId, name, accessToken).then(result => {
          console.log("is registered:", result)
          if (result) {
            // refresh user profile
            refreshUserProfile(authUserId)
            setRegistered(true)
          } else {
            setRegistrationError(true)
          }
        })
      })
    }
  }

  return (
    <Container>
      <h1>Profile</h1>
      <div>
        {registered && userName && !isAccountLoading && (
          <div>Hello, {userName}!</div>
        )}
      </div>
      {!registered && !registrationError && !isAccountLoading && (
        <Container size="xs">
          <Text fw={700}>Your account is created.</Text>
          <Text size="lg">Choose a name for your account</Text>
          <ChangeName handleFormSubmit={handleFormSubmit} />
        </Container>
      )}

      {isAccountLoading && <div> Loading please wait....</div>}
    </Container>
  )
}
