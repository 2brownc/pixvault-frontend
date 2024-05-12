export function isCurrentPage(link: string, pathname: string) {
  // if not a link, eg: imperative navigation
  if (link === "") return false;

  // if it's home page
  if (link === pathname) {
    return true;
  }

  // other pages
  if (pathname) {
    const currentPage = pathname.split("/")[1];
    const page = link.substring(1);
    return currentPage === page;
  }
  return false;
}
