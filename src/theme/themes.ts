import { createTheme } from '@material-ui/core'

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
})

const darkTheme = createTheme({
  palette: {
    type: 'dark',
  },

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
})

export { theme, darkTheme }
