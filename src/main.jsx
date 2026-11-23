import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Fontes locais distribuídas com o site pelo Vite (Fontsource, licença OFL).
// Uma fonte variável por família sans-serif reduz o número de pesos baixados.
import '@fontsource-variable/dm-sans/wght.css'
import '@fontsource-variable/manrope/wght.css'
import '@fontsource/dm-serif-display/latin-400-italic.css'
import './index.css'
import App from './App.jsx'
import SiteErrorBoundary from './components/SiteErrorBoundary.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SiteErrorBoundary><App /></SiteErrorBoundary>
  </StrictMode>,
)
