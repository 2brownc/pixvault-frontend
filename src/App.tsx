import { RouterProvider } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import router from "./router"
import { LoadingOverlay, Box } from "@mantine/core"
import ScrollToTop from "./components/scrollToTop/ScrollToTop"

const App = () => {
  const { isLoading, error } = useAuth0()

  if (error) {
    console.log("Oops: Auth0 Error: ", { error })
    return <div>Oops: Auth0 Error: {error.message}</div>
  }

  if (isLoading) {
    return (
      <Box pos="relative">
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        LOADING
      </Box>
    )
  }

  return (
    <div>
      <RouterProvider router={router} />
      <ScrollToTop />
    </div>
  )
}

export default App
