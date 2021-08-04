import React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import App from './App'

// TODO Theming with Redux

const theme = createTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*::-webkit-scrollbar': {
          width: '10px',
        },
        '*::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: '#d6dee1',
          borderRadius: '20px',
          width: '10px',
        },
      },
    },
  },

  typography: {
    button: {
      textTransform: 'none',
    },
  },
})

const darkTheme = createTheme({
  typography: {
    button: {
      textTransform: 'none',
    },
  },

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
