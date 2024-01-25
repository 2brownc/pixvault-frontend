export function isCurrentPage(link: string, pathname: string) {
  console.log("navi", { pathname })
  // if it's home page
  if (link === pathname) {
    return true
  }

  // other pages
  if (pathname) {
    const currentPage = pathname.split("/")[1]
    const page = link.substring(1)
    return currentPage === page
  } else {
    return false
  }
}
