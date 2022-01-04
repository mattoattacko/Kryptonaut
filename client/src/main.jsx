import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { TransactionProvider } from './context/TransactionContext';

// We wrap the application with 'TransactionProvider' so that it will have access to the data we pass into it. Ie: whatever we pass in as the 'value' in TransactionContext.jsx
ReactDOM.render(
  <TransactionProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </TransactionProvider>,
  document.getElementById('root')
)
