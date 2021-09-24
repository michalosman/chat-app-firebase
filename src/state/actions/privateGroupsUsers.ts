import { AppAction, SET_PRIVATE_CHATS_USERS } from '../../types/actions'
import User from '../../types/User'

const setPrivateGroupsUsers = (users: User[]): AppAction => {
  return {
    type: SET_PRIVATE_CHATS_USERS,
    users,
  }
}

export { setPrivateGroupsUsers }
