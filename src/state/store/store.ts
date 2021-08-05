import { createStore } from 'redux'
import rootReducer from '../reducers'

const theme = localStorage.getItem('theme')

let initialState = {
  darkThemeEnabled: theme ? JSON.parse(theme) : false,
}

export const store = createStore(rootReducer, initialState)

store.subscribe(() => {
  const darkThemeEnabled = store.getState().darkThemeEnabled
  localStorage.setItem('theme', JSON.stringify(darkThemeEnabled))
})

export type AppState = ReturnType<typeof rootReducer>
