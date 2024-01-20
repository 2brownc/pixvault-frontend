import { RouterProvider } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"

import router from "./router"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"

const App = () => {
  const { isLoading, error } = useAuth0()

  if (error) {
    return <div>Oops... {error.message}</div>
  }

  if (isLoading) {
    return <div>LOADING</div>
  }

  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        <RouterProvider router={router} />
      </div>
      <Footer />
    </>
  )
}

export default App
