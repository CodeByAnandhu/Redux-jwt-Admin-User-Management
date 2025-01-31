import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './store.js'
import {Provider} from 'react-redux'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
   <React.StrictMode>
    <BrowserRouter>
     <App />
    </BrowserRouter>
   </React.StrictMode>
  </Provider>
)
