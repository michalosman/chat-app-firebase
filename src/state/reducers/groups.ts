import { AppAction, SET_GROUPS } from '../../types/actions'
import Group from '../../types/Group'

const INIT_STATE: Group[] = []

const groupsReducer = (state = INIT_STATE, action: AppAction): Group[] => {
  switch (action.type) {
    case SET_GROUPS:
      return action.groups
    default:
      return state
  }
}

export { INIT_STATE as GROUPS_INIT_STATE }

export default groupsReducer
