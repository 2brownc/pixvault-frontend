import { Group, Card } from "@mantine/core"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { ImageTags } from "../imageTags/ImageTags"
import { ImageItem } from "../imageItem/ImageItem"
import type { Image as ImageType } from "../../types"
import FavButton from "../favbutton/FavButton"
import {
  IconHeart,
  IconHeartFilled,
  IconHistory,
  IconShare3,
} from "@tabler/icons-react"
import type { ImageRecord } from "../../types"
import { favButtonClick } from "../../utils/favButtonAction"
import styles from "./Gallery.module.css"
import { getImageRecord } from "../../utils/imageRecord"

type ImageGalleryProps = {
  images: ImageType[]
  accessToken: string | null
  userId: string | null
}
export default function ImageGallery({
  images,
  accessToken,
  userId,
}: ImageGalleryProps) {
  // filter for normal images
  const imagesFiltered = images.filter(image => !image.mature)
  // like button color
  const favButtonColor = "#e52b50"
  return (
    <div style={{ margin: "2rem" }}>
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 450: 2, 800: 3, 900: 4 }}
      >
        <Masonry gutter="10px">
          {imagesFiltered.map(image => (
            <Card
              key={image.id}
              shadow="sm"
              padding="sm"
              radius="md"
              withBorder
            >
              <Card.Section>
                <div className={styles.imageContainer}>
                  <ImageItem image={image} />
                  <div className={styles.imageButtons}>
                    <span className={styles.favButton}>
                      <FavButton
                        before={<IconHeart />}
                        after={<IconHeartFilled />}
                        action={favButtonClick(
                          accessToken,
                          userId,
                          getImageRecord(image),
                        )}
                        color={favButtonColor}
                      />
                    </span>
                    <span className={styles.seen}>
                      <IconHistory />
                    </span>
                    <span className={styles.share}>
                      <IconShare3 />
                    </span>
                  </div>
                </div>
                <Group className={styles.tagGroup}>
                  <ImageTags tags={image.tags} limit={4} />
                </Group>
              </Card.Section>
            </Card>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  )
}
