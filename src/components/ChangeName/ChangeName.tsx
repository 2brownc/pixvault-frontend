import { Box, TextInput, Button } from "@mantine/core"

interface ChangeNameProps {
	handleFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

const ChangeName: React.FC<ChangeNameProps> = ({ handleFormSubmit }) => {
	return (
		<>
			<form onSubmit={handleFormSubmit}>
				<Box>
					<TextInput
						label="Name"
						placeholder="Enter your name"
						required
						mt="md"
						name="name"
						id="name"
					/>
					<Button type="submit" mt="xl">
						Update Name
					</Button>
				</Box>
			</form>
		</>
	)
}

export default ChangeName
