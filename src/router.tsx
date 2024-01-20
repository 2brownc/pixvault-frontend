import { createBrowserRouter } from "react-router-dom"
import Home from "./Home"
import Profile from "./Profile"
import Search from "./Search"

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
    path: "search",
    element: <Search />,
  },
])

export default router
