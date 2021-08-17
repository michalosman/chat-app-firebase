import { TOGGLE_DARKTHEME, AppAction } from '../../types/actions'

const toggleDarkTheme = () => {
  return {
    type: TOGGLE_DARKTHEME,
  }
}

export { toggleDarkTheme }
