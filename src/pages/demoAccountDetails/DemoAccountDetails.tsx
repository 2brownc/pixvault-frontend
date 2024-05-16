import { Box, Container, Title, Text, Flex } from "@mantine/core"
import { DemoAccountCredentials } from "../../components/demoAccountCredentials/DemoAccountCredentials"

export default function DemoAccountDetails() {
	return (
		<Container mt="20">
			<Title order={2}>Demo Account Credentials</Title>
			<Text mt="5">
				If you don't want to create an account use these credentials to log into
				a Demo Account.
			</Text>
			<Flex justify="center" align="center" mt="30">
				<Box w={{ base: "auto", md: "400px" }}>
					<DemoAccountCredentials />
				</Box>
			</Flex>
		</Container>
	)
}
