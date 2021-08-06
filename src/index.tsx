import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import DarkThemeProvider from './theme/DarkThemeProvider'
import { store } from './state/store/store'

import { CssBaseline } from '@material-ui/core'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <DarkThemeProvider>
        <CssBaseline />
        <App />
      </DarkThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
