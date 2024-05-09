import Loading from "../../components/loading/Loading";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateUser } from "../../features/user/userSlice";
import {
  selectName,
  selectId,
  selectHistory,
  selectFavorites,
  accountLoading,
} from "../../features/user/userSlice";
import { useState, useEffect, useCallback } from "react";
import { isRegisteredUser, registerUser } from "../../utils/user";
import { Container, Text, Stack } from "@mantine/core";
import ChangeName from "../../components/ChangeName/ChangeName";
import ImagePreview from "../../components/PreviewGallery/PreviewGallery";
import { useAuth0 } from "@auth0/auth0-react";

export default function Profile() {
  const dispatch = useAppDispatch();

  // Get user data from Redux store
  const userName = useAppSelector(selectName);
  const userId = useAppSelector(selectId);
  const userFavorites = useAppSelector(selectFavorites);
  const isAccountLoading = useAppSelector(accountLoading);

  // State variables to track user registration status
  const [registered, setRegistered] = useState<boolean>(false);
  const [registrationError, setRegistrationError] = useState<boolean>(false);

  const { getAccessTokenSilently } = useAuth0();

  // Function to refresh user profile data
  const refreshUserProfile = useCallback(
    (userId: string) => {
      getAccessTokenSilently().then((accessToken) => {
        dispatch(updateUser({ userId, accessToken }));
      });
    },
    [dispatch, getAccessTokenSilently]
  );

  // Check if userId is available and set registered to true
  useEffect(() => {
    if (userId) {
      setRegistered(true);
    } else {
      setRegistered(false);
    }
  }, [userId]);

  if (isAccountLoading) {
    return <Loading width="auto" />;
  }

  if (!userId) {
    return <div>Not authenticated :(</div>;
  }

  // Function to handle form submission for user registration
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const name = formData.get("name") as string;

    if (userId && name) {
      getAccessTokenSilently().then((accessToken) => {
        registerUser(userId, name, accessToken).then((result) => {
          if (result) {
            // Refresh user profile after successful registration
            refreshUserProfile(userId);
            setRegistered(true);
          } else {
            setRegistrationError(true);
          }
        });
      });
    }
  };

  return (
    <Container>
      <h1>Profile</h1>
      <div>
        {registered && userName && !isAccountLoading && (
          <div>Hello, {userName}!</div>
        )}
      </div>
      {!registered && registrationError && !isAccountLoading && (
        <Container size="xs">
          <Text fw={700}>Your account is created.</Text>
          <Text size="lg">Choose a name for your account</Text>
          <ChangeName handleFormSubmit={handleFormSubmit} />
        </Container>
      )}

      {isAccountLoading && <Loading width="auto" />}

      {registered && !isAccountLoading && (
        <div>
          <h2>Favorites</h2>
          <div>
            {userFavorites?.length > 0 ? (
              <Stack>
                <Text>Your favorite images.</Text>
                <ImagePreview images={userFavorites} imageLimit={6} />
              </Stack>
            ) : (
              <Text>
                You haven't favorited any images yet! What are you waiting for?!
                Explore an amazing catalog of images and see what you like! Go
                to search page.
              </Text>
            )}
          </div>
        </div>
      )}
    </Container>
  );
}
