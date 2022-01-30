import { SET_USER, AppAction } from '../types/actions'
import User from '../types/User'

const setUser = (user: User): AppAction => {
  return {
    type: SET_USER,
    user,
  }
}

export { setUser }
