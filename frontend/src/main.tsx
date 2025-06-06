import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter } from 'react-router-dom'

// Define Auth0 configuration using environment variables
// Make sure these are set in your frontend/.env.local file
const domain = import.meta.env.VITE_AUTH0_DOMAIN
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID

// Ensure domain and clientId are not undefined (basic check)
if (!domain || !clientId) {
  console.error("Auth0 configuration is missing. Please check your environment variables.");
  // You might want to render an error message to the user
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain={domain!}
        clientId={clientId!}
        authorizationParams={{
          redirect_uri: window.location.origin + '/onboarding',
          audience: 'https://' + domain + '/api/v2/',
          scope: 'openid profile email'
        }}
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>,
)