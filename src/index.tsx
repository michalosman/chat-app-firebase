import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import CustomThemeProvider from './theme/CustomThemeProvider'
import { store } from './store'
import { CssBaseline } from '@material-ui/core'

ReactDOM.render(
  <Provider store={store}>
    <CustomThemeProvider>
      <CssBaseline />
      <App />
    </CustomThemeProvider>
  </Provider>,
  document.getElementById('root')
)
