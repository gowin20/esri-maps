import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { setAssetPath } from "@esri/calcite-components/dist/components";
// CDN hosted assets for calcite
setAssetPath("https://cdn.jsdelivr.net/npm/@esri/calcite-components/dist/calcite/assets");


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);