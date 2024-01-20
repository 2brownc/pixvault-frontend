import { MantineProvider } from "@mantine/core"
import "@mantine/core/styles.css"
import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import { store } from "./app/store"
import "./index.css"
import router from "./router"

import { Auth0Provider } from "@auth0/auth0-react"
import { getConfig } from "./config"

const onRedirectCallback = (appState: any) => {
  router.navigate(
    appState && appState.returnTo
      ? appState.returnTo
      : window.location.pathname,
  )
}

const config = getConfig()

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  onRedirectCallback,
  authorizationParams: {
    redirect_uri: window.location.origin,
    ...(config.audience ? { audience: config.audience } : null),
  },
}

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Auth0Provider {...providerConfig}>
        <Provider store={store}>
          <MantineProvider>
            <App />
          </MantineProvider>
        </Provider>
      </Auth0Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
