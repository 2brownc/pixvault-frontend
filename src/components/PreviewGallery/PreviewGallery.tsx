import { Card, Box, Stack, Button } from "@mantine/core";
import type { ImageRecord } from "../../types";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { SimpleImageItem } from "../imageItem/SimpleImageItem";

interface ImageCardProps {
  images: ImageRecord[];
  imageLimit: number;
  handleViewMoreClick: () => void;
}

export default function PreviewGallery({
  images,
  imageLimit,
  handleViewMoreClick,
}: ImageCardProps) {
  const fewImages = images.slice(0, imageLimit);

  return (
    <Card withBorder shadow="md">
      <Stack>
        <Box p-4 h-md>
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 450: 2, 800: 3 }}
          >
            <Masonry gutter="10px">
              {fewImages.map((image) => (
                <Box key={image.id}>
                  <SimpleImageItem image={image} />
                </Box>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </Box>
        <Stack gap="md" align="flex-end">
          <Button variant="outline" size="sm" onClick={handleViewMoreClick}>
            View All
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
