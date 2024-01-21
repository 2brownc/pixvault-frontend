import { createBrowserRouter } from "react-router-dom"
import Home from "./pages/home/Home"
import Profile from "./pages/profile/Profile"
import Search from "./pages/search/Search"

const router = createBrowserRouter([
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
])

export default router
