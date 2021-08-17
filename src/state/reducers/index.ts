import { combineReducers } from 'redux'
import userReducer from './user'
import groupsReducer from './groups'
import messagesReducer from './messages'
import darkThemeEnabledReducer from './darkThemeEnabled'

const rootReducer = combineReducers({
  user: userReducer,
  groups: groupsReducer,
  messages: messagesReducer,
  darkThemeEnabled: darkThemeEnabledReducer,
})

export default rootReducer
