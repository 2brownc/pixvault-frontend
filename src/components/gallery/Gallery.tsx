import { Group, Card } from "@mantine/core";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { ImageTags } from "../imageTags/ImageTags";
import { ImageItem } from "../imageItem/ImageItem";
import type { Image as ImageType, ImageId } from "../../types";
import FavButton from "../favbutton/FavButton";
import {
  IconHeart,
  IconHeartFilled,
  IconHistory,
  IconShare3,
} from "@tabler/icons-react";
import styles from "./Gallery.module.css";
import { getImageRecord } from "../../utils/imageRecord";
import { useAppSelector } from "../../app/hooks";
import { selectHistory } from "../../features/user/userSlice";

type ImageGalleryProps = {
  images: ImageType[] | null;
  accessToken: string | null;
  userId: string | null;
};
export default function ImageGallery({
  images,
  accessToken,
  userId,
}: ImageGalleryProps) {
  const userHistory = useAppSelector(selectHistory);
  // if there are no images to display, return nothing
  if (!images) {
    return <></>;
  }

  const prepareFavButton = (
    accessToken: string,
    userId: string,
    image: ImageType
  ) => {
    return (
      <FavButton
        before={<IconHeart />}
        after={<IconHeartFilled />}
        userId={userId}
        accessToken={accessToken}
        imageRecord={getImageRecord(image)}
        color={favButtonColor}
      />
    );
  };

  const isRecentImage = (image: ImageType) => {
    if (userId && userHistory) {
      const isRecent = userHistory.some(
        (recentImage) => recentImage.id === image.id
      );

      return isRecent;
    }
    return false;
  };

  // filter for normal images
  const imagesFiltered = images.filter((image) => !image.mature);
  // like button color
  const favButtonColor = "#e52b50";
  return (
    <div style={{ margin: "2rem" }}>
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 450: 2, 800: 3, 900: 4 }}
      >
        <Masonry gutter="10px">
          {imagesFiltered.map((image) => (
            <Card
              key={image.id}
              shadow="sm"
              padding="sm"
              radius="md"
              withBorder
            >
              <Card.Section>
                <div className={styles.imageContainer}>
                  <ImageItem image={image} accessToken={accessToken} />
                  <div className={styles.imageButtons}>
                    <span className={styles.favButton}>
                      {accessToken &&
                        userId &&
                        prepareFavButton(accessToken, userId, image)}
                    </span>
                    {isRecentImage(image) && (
                      <span className={styles.seen}>
                        <IconHistory />
                      </span>
                    )}
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
  );
}
