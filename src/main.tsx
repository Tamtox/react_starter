// Dependencies
import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
// Styles
import '@/index.scss'
// Components
import App from '@/app';
import store from '@/store/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
