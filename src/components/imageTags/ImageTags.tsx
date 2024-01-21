import { Link } from "react-router-dom"
import { navigateToTagSearch } from "../../utils/clickAction"
import styles from "./ImageTags.module.css"
import { requiredTags } from "../../utils/requiredTags"

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
