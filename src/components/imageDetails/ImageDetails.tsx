import { Modal, Button, Table, Space, Divider, Text } from "@mantine/core"
import type { Image as ImageType } from "../../types"
import { RelatedImages } from "./RelatedImages"
import styles from "./ImageDetails.module.css"

async function handleDownload(imageUrl: string, filename: string) {
  try {
    const response = await fetch(imageUrl)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", filename)
    link.click()
  } catch (error) {
    console.error("Error downloading image:", error)
  }
}

function DetailLink({ detail, link }: { detail: string; link: string }) {
  return (
    <a
      href={`${link}`}
      target="_blank"
      rel="noreferrer"
    >{`${detail.toUpperCase()}`}</a>
  )
}

function ImageDetails({ image }: { image: ImageType }) {
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
        <Button
          fullWidth
          onClick={() =>
            handleDownload(image.url, `${image.title}.${image.filetype}`)
          }
        >
          Download
        </Button>
        <Divider my="md" />
        <Text size="sm">Realted Images</Text>
        <Space h="lg" />
        <RelatedImages identifier={image.id} limit={6} />
      </div>
    </div>
  )
}

export function ImageDetailsModal({
  image,
  opened,
  close,
}: {
  image: ImageType
  opened: boolean
  close: () => void
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
        <ImageDetails image={image} />
      </Modal>
    </>
  )
}
