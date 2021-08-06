import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import DarkThemeProvider from './theme/DarkThemeProvider'
import { store } from './state/store/store'

import { CssBaseline } from '@material-ui/core'

ReactDOM.render(
  <Provider store={store}>
    <DarkThemeProvider>
      <CssBaseline />
      <App />
    </DarkThemeProvider>
  </Provider>,
  document.getElementById('root')
)
