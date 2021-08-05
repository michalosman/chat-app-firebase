export const TOGGLE_DARKTHEME = 'TOGGLE_DARKTHEME'

export interface ToggleDarkThemeAction {
  type: typeof TOGGLE_DARKTHEME
}

export type DarkThemeEnabledAction = ToggleDarkThemeAction

export type AppAction = DarkThemeEnabledAction
