import { Skeleton, Flex } from "@mantine/core"

function Image() {
  return (
    <Flex>
      <Skeleton height={50} circle mb="xl" />
      <Skeleton height={8} radius="xl" />
      <Skeleton height={8} mt={6} radius="xl" />
      <Skeleton height={8} mt={6} width="70%" radius="xl" />
    </Flex>
  )
}

export function LoadingGallery({ items }: { items: number }) {
  return new Array(items).fill(null).map(() => <Image />)
}
