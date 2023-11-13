import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GlobalContextProvider } from './Contexts/GlobalContext.tsx'
import { HashRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GlobalContextProvider>
    <HashRouter>
    <App />
    </HashRouter>
    
  </GlobalContextProvider>,
)
