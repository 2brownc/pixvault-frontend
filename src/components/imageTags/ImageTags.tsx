import { Link } from "react-router-dom"
import styles from "./ImageTags.module.css"

const getImagesByTag = (tag: string) => `/search/tag/${tag}/`

function requiredTags(strings: string[], limit: number): string[] {
  // Filter out strings containing numbers using a regular expression:
  const filteredStrings = strings.filter(str => !/\d/.test(str))

  // Remove duplicates using a Set:
  const uniqueStrings = [...new Set(filteredStrings)]

  // only return limit no. of items
  return uniqueStrings.slice(0, limit)
}

const BadgeLink = ({ text }: { text: string }) => {
  return (
    <Link
      to={getImagesByTag(text)}
      target="_blank"
      className={styles.badgeLink}
    >{`${text}`}</Link>
  )
}

export function ImageTags({ tags, limit }: { tags: string[]; limit: number }) {
  return (
    <>
      {requiredTags(tags, limit).map(tag => (
        <BadgeLink text={tag} key={tag} />
      ))}
    </>
  )
}
