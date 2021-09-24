import User from '../../types/User'
import { AppAction, SET_PRIVATE_CHATS_USERS } from '../../types/actions'

const INIT_STATE: User[] = []

const privateGroupsUsersReducer = (
  state = INIT_STATE,
  action: AppAction
): User[] => {
  switch (action.type) {
    case SET_PRIVATE_CHATS_USERS:
      return action.users
    default:
      return state
  }
}

export default privateGroupsUsersReducer
