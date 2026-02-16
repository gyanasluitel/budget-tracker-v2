// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./reset.css";
import App from './App.tsx'
import { BrowserRouter } from "react-router";
import { BudgetContextProvider } from './context/BudgetContextProvider.tsx';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
    <BudgetContextProvider>
        <App />
    </BudgetContextProvider>
    </BrowserRouter>
)
