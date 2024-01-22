import { CircleLoader } from "react-spinners"
import { Flex, Box } from "@mantine/core"

export default function Loading({ width }: { width: string }) {
  return (
    <Flex style={{ width: `${width}` }} justify="center" align="center">
      <Box>
        <CircleLoader color="#008000" size={50} />
      </Box>
    </Flex>
  )
}
