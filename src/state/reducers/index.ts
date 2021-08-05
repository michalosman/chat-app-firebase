import { combineReducers } from 'redux'
import darkThemeEnabledReducer from './darkThemeEnabled'

const rootReducer = combineReducers({
  darkThemeEnabled: darkThemeEnabledReducer,
})

export default rootReducer
