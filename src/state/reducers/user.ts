import User from '../../types/User'
import { SET_USER, AppAction } from '../../types/actions'

const INIT_STATE: User = null

const userReducer = (state = INIT_STATE, action: AppAction): User => {
  switch (action.type) {
    case SET_USER:
      return action.user
    default:
      return state
  }
}

export default userReducer
