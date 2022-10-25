import React from 'react'
import ReactDOM from 'react-dom/client'
import * as Panelbear from "@panelbear/panelbear-js";

import App from './App'
import './index.css'

Panelbear.load(import.meta.env.VITE_PANEL_BEAR_SITE_ID, {
  debug: import.meta.env.MODE === 'development',
});

console.log(import.meta.env)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
