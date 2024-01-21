import { Group, Card } from "@mantine/core"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { ImageTags } from "../imageTags/ImageTags"
import { ImageItem } from "../imageItem/ImageItem"
import type { Image as ImageType } from "../../types"

export default function ImageGallery({ images }: { images: ImageType[] }) {
  console.log("gallery: ", images)
  return (
    <div style={{ margin: "2rem" }}>
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 450: 2, 800: 3, 900: 4 }}
      >
        <Masonry gutter="10px">
          {images.map(image => (
            <Card
              key={image.id}
              shadow="sm"
              padding="sm"
              radius="md"
              withBorder
            >
              <Card.Section style={{ overflow: "hidden" }}>
                <ImageItem image={image} />
              </Card.Section>
              <Group style={{ marginTop: "10px" }}>
                <ImageTags tags={image.tags} limit={4} />
              </Group>
            </Card>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  )
}
