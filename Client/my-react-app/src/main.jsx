import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ContextP from './ContextAnu.jsx';
import { MovieProvider } from './Components/MovieContext.jsx';
// import { MovieProvider } from './Components/MovieContext'; 

createRoot(document.getElementById('root')).render(

  <MovieProvider>  
    <App />
    </MovieProvider>


,
)
