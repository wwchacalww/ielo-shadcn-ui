import './index.css'

import { createRoot } from 'react-dom/client'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router'

import { AppRoutes } from './routes.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <HelmetProvider>
      <Helmet titleTemplate="%s | Instituto Elo" />

      <AppRoutes />
    </HelmetProvider>
  </BrowserRouter>,
)
