import { MantineProvider } from "@mantine/core"
import "@mantine/core/styles.css"
import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import { store } from "./app/store"
import "./index.css"

import { Auth0Provider } from "@auth0/auth0-react"
import { authConfig } from "./authConfig"

const providerConfig = {
	domain: authConfig.domain,
	clientId: authConfig.clientId,
	authorizationParams: {
		redirect_uri: `${window.location.origin}/profile`,
		audience: authConfig.audience,
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
