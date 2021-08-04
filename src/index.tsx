import React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import App from './App'

// TODO Theming with Redux

const theme = createTheme({})

const darkTheme = createTheme({
  palette: {
    type: 'dark',
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={true ? theme : darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
