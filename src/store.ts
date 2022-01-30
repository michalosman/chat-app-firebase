import { createStore, compose } from 'redux'
import rootReducer from './reducers'

const theme = localStorage.getItem('theme')

let initialState = {
  darkThemeEnabled: theme ? JSON.parse(theme) : false,
}

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, initialState, composeEnhancers())

store.subscribe(() => {
  const darkThemeEnabled = store.getState().darkThemeEnabled
  localStorage.setItem('theme', JSON.stringify(darkThemeEnabled))
})

export type AppState = ReturnType<typeof rootReducer>
