import { AppAction, SET_PRIVATE_CHATS_USERS } from '../../types/actions'
import User from '../../types/User'

const setPrivateChatsUsers = (users: User[]): AppAction => {
  return {
    type: SET_PRIVATE_CHATS_USERS,
    users,
  }
}

export { setPrivateChatsUsers }
