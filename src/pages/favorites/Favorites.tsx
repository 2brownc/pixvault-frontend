import { useAppDispatch, useAppSelector } from "../../app/hooks";
import type { ImageRecord } from "../../types";
import {
  selectFavorites,
  selectId,
  accountLoading,
  updateUser,
} from "../../features/user/userSlice";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../../components/loading/Loading";
import ImageGallery from "../../components/gallery/Gallery";
import { Container, Box } from "@mantine/core";
import { useState, useEffect } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useImageListScroller } from "../../hooks/useImageListScroller";

export default function Favorites() {
  // Get user data and authentication status from Auth0
  // Hook to get user data and authentication status from Auth0
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  // State to store access token
  const [accessToken, setAccessToken] = useState<string>("");
  // Get user ID from Redux store
  const userId = useAppSelector(selectId);
  // Get user favorites from Redux store
  const userFavorites = useAppSelector(selectFavorites);
  // Get account loading status from Redux store
  const isAccountLoading = useAppSelector(accountLoading);
  // Get Redux dispatch function
  const dispatch = useAppDispatch();

  useEffect(() => {
    getAccessTokenSilently().then((token) => {
      setAccessToken(token); // Get access token silently and store it in state
    });
  });

  useEffect(() => {
    // refresh user profile if empty
    if (accessToken && !userId) {
      dispatch(updateUser({ userId, accessToken })); // Dispatch action to update user if user ID is empty
    }
  }, [userId, accessToken, dispatch]);

  const { images, loadNextPage, hasNextPage, loading, error } =
    useImageListScroller({ imageRecords: userFavorites, pageSize: 9 }); // Hook to handle infinite scrolling of images

  if (!isAuthenticated) {
    return <div>Not authenticated :(</div>; // Render message if user is not authenticated
  }

  const [sentryRef] = useInfiniteScroll({
    loading, // Pass loading status to useInfiniteScroll hook
    hasNextPage, // Pass hasNextPage status to useInfiniteScroll hook
    onLoadMore: loadNextPage, // Pass loadNextPage function to useInfiniteScroll hook
    // When there is an error, we stop infinite loading.
    // It can be reactivated by setting "error" state as undefined.
    disabled: !!error, // Disable infinite scrolling if there is an error
    // `rootMargin` is passed to `IntersectionObserver`.
    // We can use it to trigger 'onLoadMore' when the sentry comes near to become
    // visible, instead of becoming fully visible on the screen.
    rootMargin: "0px 0px 900px 0px", // Set rootMargin for IntersectionObserver
  });

  return (
    <Container>
      <h2>Favorites</h2>
      <Box>
        {images && accessToken && userId && (
          <div>
            <ImageGallery
              images={images}
              userId={userId}
              accessToken={accessToken}
            />
            <div ref={sentryRef}>
              {/* New images will be loaded when this div enters the screen*/}
            </div>
          </div>
        )}
        {(isLoading || isAccountLoading || loading) && <Loading width="auto" />}
      </Box>
    </Container>
  );
}
