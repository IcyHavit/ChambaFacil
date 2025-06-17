import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import theme from './theme.jsx'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <GoogleOAuthProvider clientId="203718264011-i035nbljo1gq6bvpr531lq4fsa2bdbmg.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>,
    </ThemeProvider>
  </StrictMode>,
)
