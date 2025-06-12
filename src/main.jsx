import { StrictMode } from 'react'
import './index.css'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes } from "react-router";
import AppRoutes from "./routes/AppRoutes.jsx";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AuthProvider } from './contexts/AuthContext.jsx';

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <StrictMode>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
    </StrictMode>
  </BrowserRouter>
)
