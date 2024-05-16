import { Button, Flex, Stack, Box, Text } from "@mantine/core"
import Gallery from "../../components/gallery/Gallery"
import Hero from "../../components/hero/Hero"
import SearchBox from "../../components/searchBox/SearchBox"
import Loading from "../../components/loading/Loading"
import { useSearch } from "../../hooks/useSearch"
import { useAppSelector } from "../../app/hooks"
import { useAuth0 } from "@auth0/auth0-react"
import { selectId } from "../../features/user/userSlice"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Home() {
	const navigate = useNavigate()
	const userId = useAppSelector(selectId)
	const [accessToken, setAccessToken] = useState<string | null>(null)
	const { getAccessTokenSilently } = useAuth0()

	// Fetch access token when available
	useEffect(() => {
		if (userId) {
			getAccessTokenSilently().then((accessToken) => {
				setAccessToken(accessToken)
			})
		}
	}, [getAccessTokenSilently, userId])

	const { images, loadNextPage, hasNextPage, loading, error } = useSearch({
		keyword: import.meta.env.VITE_HOME_SEARCHTERM,
		pages: 1,
	})

	const SearchButton = () => {
		const link = `/search/keyword/${import.meta.env.VITE_DEFAULT_SEARCHTERM}`

		return (
			<Button onClick={() => navigate(link)}>
				Search for the image you want...
			</Button>
		)
	}

	return (
		<Stack>
			<Hero />

			<SearchBox placeholder="What are you looking for?" />

			{images && (
				<Box>
					<Gallery
						images={images}
						userId={userId ?? null}
						accessToken={accessToken ?? null}
					/>

					<Stack align="center" justify="center">
						<Text>...and many more.</Text>
						<SearchButton />
					</Stack>
				</Box>
			)}

			{loading && <Loading width="90vw" />}

			{error && (
				<Flex justify="center" align="center">
					<div>No Images Found</div>
				</Flex>
			)}
		</Stack>
	)
}
