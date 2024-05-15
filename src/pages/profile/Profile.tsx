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
import { registerUser } from "../../utils/user";
import { Container, Text, Stack, Box, Button } from "@mantine/core";
import ChangeName from "../../components/ChangeName/ChangeName";
import ImagePreview from "../../components/PreviewGallery/PreviewGallery";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleViewFavoritesClick = () => {
    navigate("/favorites");
  };

  const handleViewHistoryClick = () => {
    navigate("/history");
  };

  // Get user data from Redux store
  const userName = useAppSelector(selectName);
  const userId = useAppSelector(selectId);
  const userFavorites = useAppSelector(selectFavorites);
  const userHistory = useAppSelector(selectHistory);
  const isAccountLoading = useAppSelector(accountLoading);

  // State variables to track user registration status
  const [registered, setRegistered] = useState<boolean>(false);
  const [registrationError, setRegistrationError] = useState<boolean>(false);

  const { user, getAccessTokenSilently } = useAuth0();

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

  // if the user is not authenticated redirect to home page
  if (!userId) {
    navigate("/");
  }

  // Function to handle form submission for user registration
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const name = formData.get("name") as string;
    const userIdAuth = user?.sub?.split("|")[1] ?? null;

    if (userIdAuth && name) {
      getAccessTokenSilently().then((accessToken) => {
        registerUser(userIdAuth, name, accessToken).then((result) => {
          if (result) {
            // Refresh user profile after successful registration
            refreshUserProfile(userIdAuth);
            setRegistered(true);
          } else {
            setRegistrationError(true);
          }
        });
      });
    }
  };

  const SearchButton = () => {
    const link = `/search/keyword/${import.meta.env.VITE_DEFAULT_SEARCHTERM}`;

    return (
      <Button variant="transparent" onClick={() => navigate(link)}>
        Go search for images you like!
      </Button>
    );
  };

  return (
    <Container>
      <h1>Profile</h1>

      {/* If user profile is loading */}
      {isAccountLoading && <Loading width="auto" />}

      {/* If user is not logged in*/}
      {!user && <Text>Please login to continue.</Text>}

      {/*
        If user logins for the first time after creating the account
        invited them to customize their profile by registring a username
      */}
      {registered && userName && !isAccountLoading && (
        <div>Hello, {userName}!</div>
      )}
      {user && !registered && !isAccountLoading && (
        <Container size="xs">
          <Text fw={700}>Your account is created.</Text>
          <Text size="lg">Choose a name for your account</Text>
          <ChangeName handleFormSubmit={handleFormSubmit} />
        </Container>
      )}

      {/* When username registration fails */}
      {registrationError && (
        <Text>User registration failed! Please try later.</Text>
      )}

      {/* When user is logged in, registred and user profile is loaded */}

      {/* then show user fav images */}
      {registered && !isAccountLoading && (
        <div>
          <h2>Favorites</h2>
          <div>
            {userFavorites?.length > 0 ? (
              <Stack>
                <Text>Your favorite images.</Text>
                <ImagePreview
                  images={userFavorites}
                  imageLimit={6}
                  handleViewMoreClick={handleViewFavoritesClick}
                />
              </Stack>
            ) : (
              <Stack>
                <Text>
                  You haven't favorited any images yet! What are you waiting
                  for?! Explore an amazing catalog of images and see what you
                  like! Go to search page.
                </Text>
                <SearchButton />
              </Stack>
            )}
          </div>
        </div>
      )}

      {/* then show user recent images */}
      {registered && !isAccountLoading && (
        <div>
          <h2>Recent Images</h2>
          <div>
            {userHistory?.length > 0 ? (
              <Stack>
                <Text>Images you viewed recently</Text>
                <ImagePreview
                  images={userHistory}
                  imageLimit={6}
                  handleViewMoreClick={handleViewHistoryClick}
                />
              </Stack>
            ) : (
              <Stack>
                <Text>
                  You haven't viewed any images yet! What are you waiting for?!
                  Explore an amazing catalog of images and see what you like! Go
                  to the search page.
                </Text>
                <SearchButton />
              </Stack>
            )}
          </div>
        </div>
      )}
    </Container>
  );
}
