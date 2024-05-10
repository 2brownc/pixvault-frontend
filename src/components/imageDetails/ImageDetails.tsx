import {
  Modal,
  Button,
  Table,
  Space,
  Divider,
  Text,
  Group,
} from "@mantine/core";
import type { Image as ImageType, ImageRecord } from "../../types";
import { RelatedImages } from "./RelatedImages";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addRecentImage,
  addFavorites,
  removeFavorites,
  selectFavorites,
  selectId,
  selectHistory,
  favoritesLoading,
} from "../../features/user/userSlice";
import { useEffect } from "react";
import { getImageRecord } from "../../utils/imageRecord";

import styles from "./ImageDetails.module.css";

async function handleDownload(imageUrl: string, filename: string) {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    link.click();
  } catch (error) {
    console.error("Error downloading image:", error);
  }
}

function DetailLink({ detail, link }: { detail: string; link: string }) {
  return (
    <a
      href={`${link}`}
      target="_blank"
      rel="noreferrer"
    >{`${detail.toUpperCase()}`}</a>
  );
}

function ImageDetails({
  image,
  accessToken,
}: {
  image: ImageType;
  accessToken: string | null;
}) {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectId);
  const history = useAppSelector(selectHistory);
  const favorites = useAppSelector(selectFavorites);
  const favoritesStateLoading = useAppSelector(favoritesLoading);

  const imageRecord: ImageRecord = getImageRecord(image);

  const addImageToRecents = () => {
    const isRecent = history.some((recentImage) => recentImage.id === image.id);
    if (accessToken && !isRecent) {
      dispatch(addRecentImage({ imageRecord, userId, accessToken }));
    }
  };

  const LikeButton = () => {
    if (!userId || !accessToken) {
      return <></>;
    }

    const isLiked = favorites.some((favorite) => favorite.id === image.id);
    const handleClick = () => {
      if (isLiked) {
        dispatch(removeFavorites({ imageRecord, userId, accessToken }));
      } else {
        dispatch(addFavorites({ imageRecord, userId, accessToken }));
      }
    };

    return (
      <Button
        fullWidth
        onClick={handleClick}
        loading={favoritesStateLoading}
        loaderProps={{ type: "dots" }}
        color="rgb(203,65,84)"
      >
        {isLiked ? "Unlike" : "Like"}
      </Button>
    );
  };

  useEffect(addImageToRecents, []);

  return (
    <div className={styles.modalContainer}>
      <div className={styles.imageContainer}>
        <img src={image.url} alt={image.title} />
      </div>
      <div className={styles.infoContainer}>
        <Table style={{ textAlign: "center" }}>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>Author</Table.Td>
              <Table.Td>
                <DetailLink detail={image.creator} link={image.creator_url} />
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Source</Table.Td>
              <Table.Td>
                <DetailLink
                  detail={image.source}
                  link={image.foreign_landing_url}
                />
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>License</Table.Td>
              <Table.Td>
                <DetailLink
                  detail={`${image.license} ${image.license_version}`}
                  link={image.license_url}
                />
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
        <Space h="md" />
        <Group>
          <LikeButton />
          <Button
            fullWidth
            onClick={() =>
              handleDownload(image.url, `${image.title}.${image.filetype}`)
            }
          >
            Download
          </Button>
        </Group>
        <Divider my="md" />
        <Text size="sm">Realted Images</Text>
        <Space h="lg" />
        <RelatedImages
          identifier={image.id}
          limit={6}
          accessToken={accessToken}
        />
      </div>
    </div>
  );
}

export function ImageDetailsModal({
  image,
  opened,
  close,
  accessToken,
}: {
  image: ImageType;
  opened: boolean;
  close: () => void;
  accessToken: string | null;
}) {
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={`${image.title}`}
        fullScreen
        transitionProps={{ transition: "fade", duration: 200 }}
      >
        <ImageDetails image={image} accessToken={accessToken} />
      </Modal>
    </>
  );
}
