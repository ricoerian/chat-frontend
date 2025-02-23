import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ToastProvider } from './context/ToastContext.tsx'
import ThemeToggle from './components/ThemeToggle.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <ThemeToggle />
      <App />
    </ToastProvider>
  </StrictMode>,
)
