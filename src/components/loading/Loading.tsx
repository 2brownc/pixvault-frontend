import { CircleLoader } from "react-spinners"
import { Flex, Box } from "@mantine/core"

export function Loading() {
  return (
    <Flex style={{ width: "90vw" }} justify="center" align="center">
      <Box>
        <CircleLoader color="#008000" size={50} />
      </Box>
    </Flex>
  )
}
