import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {BrowserRouter} from "react-router-dom";
import { QueryParamProvider } from 'use-query-params';
import { Provider } from "react-redux";
import store from './store';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryParamProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </QueryParamProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
