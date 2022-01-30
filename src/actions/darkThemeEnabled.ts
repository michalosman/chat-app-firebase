import { TOGGLE_DARKTHEME, AppAction } from '../types/actions'

const toggleDarkTheme = (): AppAction => {
  return {
    type: TOGGLE_DARKTHEME,
  }
}

export { toggleDarkTheme }
