import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext.jsx';
import './index.css';
import { AmountContextProvider } from './context/AmountContext.jsx';

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <AmountContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AmountContextProvider>
  </AuthContextProvider>
);
