import { createBrowserRouter, Outlet } from "react-router-dom"
import Home from "./pages/home/Home"
import Profile from "./pages/profile/Profile"
import Search from "./pages/search/Search"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import styles from "./router.module.css"

function Layout() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "search/keyword/:keyword",
        element: <Search />,
      },
      {
        path: "search/tag/:tag",
        element: <Search />,
      },
    ],
  },
])

export default router
