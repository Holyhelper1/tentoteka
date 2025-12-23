import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  //  BrowserRouter,
   HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { ScrollToTop } from './Utils/ScrolltoTop.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <BrowserRouter basename="/tentoteka"> */}
    <HashRouter>

    <ScrollToTop />
      <App />
    </HashRouter>
    {/* </BrowserRouter> */}
  </StrictMode>,
)