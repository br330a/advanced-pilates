import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SiteErrorBoundary from './components/SiteErrorBoundary.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SiteErrorBoundary><App /></SiteErrorBoundary>
  </StrictMode>,
)
