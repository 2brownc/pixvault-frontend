import { Flex, Stack } from "@mantine/core";
import Gallery from "../../components/gallery/Gallery";
import Hero from "../../components/hero/Hero";
import SearchBox from "../../components/searchBox/SearchBox";
import Loading from "../../components/loading/Loading";
import { useSearch } from "../../hooks/useSearch";
import { useAppSelector } from "../../app/hooks";
import { useAuth0 } from "@auth0/auth0-react";
import { selectId } from "../../features/user/userSlice";
import { useState, useEffect } from "react";

export default function Home() {
  const userId = useAppSelector(selectId);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const { getAccessTokenSilently } = useAuth0();

  // Fetch access token when available
  useEffect(() => {
    if (userId) {
      getAccessTokenSilently().then((accessToken) => {
        setAccessToken(accessToken);
      });
    }
  }, [getAccessTokenSilently, userId]);

  const { images, loadNextPage, hasNextPage, loading, error } = useSearch({
    keyword: "scenery|scenic",
    pages: 1,
  });
  return (
    <Stack>
      <Hero />

      <SearchBox placeholder="What are you looking for?" />

      {images && (
        <Gallery
          images={images}
          userId={userId ?? null}
          accessToken={accessToken ?? null}
        />
      )}

      {loading && <Loading width="90vw" />}

      {error && (
        <Flex justify="center" align="center">
          <div>No Images Found</div>
        </Flex>
      )}
    </Stack>
  );
}
