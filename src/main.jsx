import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AppTheme } from './theme/AppTheme.jsx';
import { BrowserRouter } from 'react-router-dom';
import { NavbarProvider } from './context/Navbar.jsx';

ReactDOM.createRoot( document.getElementById( 'root' ) ).render(
  <React.StrictMode>
    <AppTheme>
      <NavbarProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NavbarProvider>
    </AppTheme>
  </React.StrictMode>,
);
