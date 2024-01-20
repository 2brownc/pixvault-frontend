import { authConfig } from "./authConfig"

export function getConfig() {
  const audience =
    authConfig.audience &&
    authConfig.audience !== import.meta.env.VITE_AUTH0_CLIENTID
      ? authConfig.audience
      : null

  return {
    domain: authConfig.domain,
    clientId: authConfig.clientId,
    ...(audience ? { audience } : null),
  }
}
