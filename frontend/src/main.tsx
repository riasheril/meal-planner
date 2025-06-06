import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'

// Define Auth0 configuration using environment variables
// Make sure these are set in your frontend/.env.local file
const domain = import.meta.env.VITE_AUTH0_DOMAIN
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID

// Ensure domain and clientId are not undefined (basic check)
if (!domain || !clientId) {
  console.error("Auth0 Domain or Client ID not set in environment variables.");
  // You might want to render an error message to the user
}

const root = createRoot(document.getElementById("root")!)

root.render(
  <Auth0Provider
    domain="dev-km6ivy4lzonnfqa2.us.auth0.com"
    clientId="cSOt78AecFHswt1ucFWvRl2PIl1dHyBP"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "https:/mealplannerapi.com/api/login",
      scope: 'openid profile email'
    }}
  >
    <App />
  </Auth0Provider>
)