import { AppAction, TOGGLE_DARKTHEME } from '../types/actions'

const INIT_STATE: boolean = false

const darkThemeEnabledReducer = (
  state = INIT_STATE,
  action: AppAction
): boolean => {
  switch (action.type) {
    case TOGGLE_DARKTHEME:
      return !state
    default:
      return state
  }
}

export default darkThemeEnabledReducer
