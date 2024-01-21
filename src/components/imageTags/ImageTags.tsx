import { Link } from "react-router-dom"
import { navigateToTagSearch } from "../../utils/clickAction"
import styles from "./ImageTags.module.css"

function requiredTags(strings: string[], limit: number): string[] {
  // Filter out strings containing numbers using a regular expression:
  const filteredStrings = strings.filter(str => !/\d/.test(str))

  // Remove duplicates using a Set:
  const uniqueStrings = [...new Set(filteredStrings)]

  // only return as per limit
  return uniqueStrings.slice(0, limit)
}

const BadgeLink = ({ text }: { text: string }) => {
  return (
    <Link to={navigateToTagSearch(text)} className={styles.badgeLink}>
      {`${text}`}
    </Link>
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
