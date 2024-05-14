import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Image,
  Stack,
  Title,
  Grid,
  Button,
  Box,
  Paper,
} from "@mantine/core";
import type { Image as ImageType } from "../../types";
import {
  IconBrandX,
  IconShare3,
  IconBrandTumblr,
  IconBrandFacebook,
  IconBrandPinterest,
} from "@tabler/icons-react";

import {
  shareTwitter,
  shareFacebook,
  shareTumblr,
  sharePinterest,
} from "../../utils/shareLinks";

import { useViewportSize } from "@mantine/hooks";

interface ShareImageProps {
  image: ImageType;
}

export function ShareImage({ image }: ShareImageProps) {
  const [openedImageShare, { open: openImageShare, close: closeImageShare }] =
    useDisclosure(false);
  const { height, width } = useViewportSize();
  return (
    <>
      <span onClick={openImageShare} onKeyDown={openImageShare}>
        <IconShare3 />
      </span>

      <Modal
        opened={openedImageShare}
        onClose={closeImageShare}
        title="Share Image"
        centered
        size="xl"
        fullScreen={width <= 400}
      >
        <Box>
          <Title order={2} lineClamp={1} mb="20">
            {image.title}
          </Title>
          <Stack align="center" justify="center">
            <Paper shadow="lg" p="sm" color="#e32636">
              <Image
                mah={{ base: "70vh", md: "60vh" }}
                src={image.url}
                alt={image.title}
                fit="contain"
              />
            </Paper>
            <Grid mt="10" w="100%">
              <Grid.Col span={{ base: 6, lg: 3 }}>
                <Button
                  fullWidth
                  leftSection={<IconBrandX />}
                  variant="light"
                  component="a"
                  href={shareTwitter(image.url, image.title)}
                  target="_blank"
                >
                  Twitter/X
                </Button>
              </Grid.Col>
              <Grid.Col span={{ base: 6, lg: 3 }}>
                <Button
                  fullWidth
                  leftSection={<IconBrandTumblr />}
                  variant="light"
                  component="a"
                  href={shareTumblr(image.url, image.title)}
                  target="_blank"
                >
                  Tumblr
                </Button>
              </Grid.Col>
              <Grid.Col span={{ base: 6, lg: 3 }}>
                <Button
                  fullWidth
                  leftSection={<IconBrandFacebook />}
                  variant="light"
                  component="a"
                  href={shareFacebook(image.url)}
                  target="_blank"
                >
                  Facebook
                </Button>
              </Grid.Col>
              <Grid.Col span={{ base: 6, lg: 3 }}>
                <Button
                  fullWidth
                  leftSection={<IconBrandPinterest />}
                  variant="light"
                  component="a"
                  href={sharePinterest(image.url, image.title)}
                  target="_blank"
                >
                  Pinterest
                </Button>
              </Grid.Col>
            </Grid>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
