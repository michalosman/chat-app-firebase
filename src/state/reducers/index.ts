import { combineReducers } from 'redux'
import userReducer from './user'
import groupsReducer from './groups'
import privateChatsUsersReducer from './privateChatsUsers'
import darkThemeEnabledReducer from './darkThemeEnabled'

const rootReducer = combineReducers({
  user: userReducer,
  groups: groupsReducer,
  privateChatsUsers: privateChatsUsersReducer,
  darkThemeEnabled: darkThemeEnabledReducer,
})

export default rootReducer
