import { useState } from "react"
import { Input, Button, Flex } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"

interface SearchBoxProps {
  placeholder: string
  onSearch: (query: string) => void
}

export default function SearchBox({ placeholder, onSearch }: SearchBoxProps) {
  const [query, setQuery] = useState("")

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const handleSearchClick = () => {
    onSearch(query)
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
      />
      <Button
        onClick={handleSearchClick}
        size="lg"
        leftSection={<IconSearch size={18} />}
      >
        Search
      </Button>
    </Flex>
  )
}
