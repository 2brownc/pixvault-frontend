import { useState } from "react"
import { Input, Button, Flex } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"
import router from "../../router"
import { navigateToKeywordSearch } from "../../utils/clickAction"

export default function SearchBox({ placeholder }: { placeholder: string }) {
	const [query, setQuery] = useState("")

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(event.target.value)
	}

	const handleSearch = () => {
		if (query === "") {
			router.navigate(
				navigateToKeywordSearch(import.meta.env.VITE_DEFAULT_SEARCHTERM),
			)
		} else {
			router.navigate(navigateToKeywordSearch(query))
		}
	}

	const handleSearchEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			// Perform your action here
			handleSearch()
		}
	}

	return (
		<Flex
			justify="center"
			align="center"
			direction={{ base: "column", sm: "row" }}
			gap="sm"
			style={{ width: "100%" }}
		>
			<Input
				value={query}
				onChange={handleInputChange}
				placeholder={placeholder}
				size="lg"
				radius="sm"
				style={{ width: "70%" }}
				onKeyDown={handleSearchEnter}
			/>
			<Button
				onClick={handleSearch}
				size="lg"
				leftSection={<IconSearch size={18} />}
			>
				Search
			</Button>
		</Flex>
	)
}
