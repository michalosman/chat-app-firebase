import { AppAction, SET_GROUPS } from '../../types/actions'
import Group from '../../types/Group'

const setGroups = (groups: Group[]): AppAction => {
  return {
    type: SET_GROUPS,
    groups,
  }
}

export { setGroups }
