import { RouterProvider } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"

import router from "./router"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"

import styles from "./App.module.css"

import { LoadingOverlay, Box } from "@mantine/core"

const App = () => {
  const { isLoading, error } = useAuth0()

  if (error) {
    return <div>Oops... {error.message}</div>
  }

  if (isLoading) {
    return (
      <Box pos="relative">
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        {/* ...other content */}
      </Box>
    )
  }

  return (
    <>
      <div>
        <Header />
      </div>
      <div className={styles.main}>
        <RouterProvider router={router} />
      </div>
      <Footer />
    </>
  )
}

export default App
