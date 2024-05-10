import { useAppDispatch, useAppSelector } from "../../app/hooks";
import type { ImageRecord } from "../../types";
import {
  selectHistory,
  selectId,
  accountLoading,
} from "../../features/user/userSlice";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../../components/loading/Loading";
import ImageGallery from "../../components/gallery/Gallery";
import { Container, Box } from "@mantine/core";
import { useState, useEffect } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useImageListScroller } from "../../hooks/useImageListScroller";

export default function History() {
  const { getAccessTokenSilently } = useAuth0();

  // Get user data from Redux store
  const [accessToken, setAccessToken] = useState<string>("");
  const userId = useAppSelector(selectId);
  const userHistory = useAppSelector(selectHistory);
  const isAccountLoading = useAppSelector(accountLoading);

  useEffect(() => {
    getAccessTokenSilently().then((token) => {
      // Get access token silently and store it in state
      setAccessToken(token);
    });
  });

  // Hook to handle infinite scrolling of images
  const { images, loadNextPage, hasNextPage, loading, error } =
    useImageListScroller({ imageRecords: userHistory, pageSize: 9 });

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

  if (!userId) {
    return <div>Not authenticated :(</div>; // Render message if user is not authenticated
  }

  return (
    <Container>
      <h2>Recent Images</h2>
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
        {(isAccountLoading || loading) && <Loading width="auto" />}
      </Box>
    </Container>
  );
}