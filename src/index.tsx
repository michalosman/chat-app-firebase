import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { CssBaseline } from '@material-ui/core'
import App from './App'
import { store } from './state/store/store'
import DarkThemeProvider from './theme/DarkThemeProvider'

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
