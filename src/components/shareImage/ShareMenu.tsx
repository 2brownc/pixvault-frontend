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
import { Grid, Button, Divider, Box } from "@mantine/core";

import type { Image as ImageType } from "../../types";

interface ShareMenuProps {
  image: ImageType;
}

export function ShareMenu({ image }: ShareMenuProps) {
  const menuGridSize = 6;
  return (
    <Box w="100%">
      <Divider my="xs" label="Share Menu" labelPosition="center" />
      <Grid mt="10" w="100%">
        <Grid.Col span={menuGridSize}>
          <Button
            fullWidth
            variant="light"
            component="a"
            href={shareTwitter(image.url, image.title)}
            target="_blank"
          >
            <IconBrandX />
          </Button>
        </Grid.Col>
        <Grid.Col span={menuGridSize}>
          <Button
            fullWidth
            variant="light"
            component="a"
            href={shareTumblr(image.url, image.title)}
            target="_blank"
          >
            <IconBrandTumblr />
          </Button>
        </Grid.Col>
        <Grid.Col span={menuGridSize}>
          <Button
            fullWidth
            variant="light"
            component="a"
            href={shareFacebook(image.url)}
            target="_blank"
          >
            <IconBrandFacebook />
          </Button>
        </Grid.Col>
        <Grid.Col span={menuGridSize}>
          <Button
            fullWidth
            variant="light"
            component="a"
            href={sharePinterest(image.url, image.title)}
            target="_blank"
          >
            <IconBrandPinterest />
          </Button>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
