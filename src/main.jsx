import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Redux
import { Provider } from 'react-redux'
import store from './store/store'

// Global Style
import GlobalStyle from './styles/global.jsx'

// Snackbar
import { SnackbarProvider } from 'notistack'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>

    <GlobalStyle />

    <SnackbarProvider
      maxSnack={2}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      style={{ fontSize: '1.5rem' }}
    >
      <App />
    </SnackbarProvider>
  </Provider>
)
