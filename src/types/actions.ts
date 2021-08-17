import Group from './Group'
import Message from './Message'
import User from './User'

export const SET_USER = 'SET_USER'
export const SET_GROUPS = 'SET_GROUPS'
export const SET_MESSAGES = 'SET_MESSAGES'
export const TOGGLE_DARKTHEME = 'TOGGLE_DARKTHEME'

export interface SetUserAction {
  type: typeof SET_USER
  user: User
}

export interface SetGroupsAction {
  type: typeof SET_GROUPS
  groups: Group[]
}

export interface SetMessagesAction {
  type: typeof SET_MESSAGES
  messages: Message[]
}

export interface ToggleDarkThemeAction {
  type: typeof TOGGLE_DARKTHEME
}

export type UserAction = SetUserAction
export type GroupsAction = SetGroupsAction
export type MessagesAction = SetMessagesAction
export type DarkThemeEnabledAction = ToggleDarkThemeAction

export type AppAction =
  | UserAction
  | GroupsAction
  | MessagesAction
  | DarkThemeEnabledAction
