import { combineReducers } from 'redux'
import userReducer from './user'
import groupsReducer from './groups'
import privateGroupsUsersReducer from './privateGroupsUsers'
import darkThemeEnabledReducer from './darkThemeEnabled'

const rootReducer = combineReducers({
  user: userReducer,
  groups: groupsReducer,
  privateGroupsUsers: privateGroupsUsersReducer,
  darkThemeEnabled: darkThemeEnabledReducer,
})

export default rootReducer
