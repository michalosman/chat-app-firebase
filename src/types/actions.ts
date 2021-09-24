import Group from './Group'
import User from './User'

export const SET_USER = 'SET_USER'
export const SET_GROUPS = 'SET_GROUPS'
export const SET_PRIVATE_CHATS_USERS = 'SET_PRIVATE_CHATS_USERS'
export const TOGGLE_DARKTHEME = 'TOGGLE_DARKTHEME'

export interface SetUserAction {
  type: typeof SET_USER
  user: User
}

export interface SetGroupsAction {
  type: typeof SET_GROUPS
  groups: Group[]
}

export interface SetPrivateGroupsUsersAction {
  type: typeof SET_PRIVATE_CHATS_USERS
  users: User[]
}

export interface ToggleDarkThemeAction {
  type: typeof TOGGLE_DARKTHEME
}

export type UserAction = SetUserAction
export type GroupsAction = SetGroupsAction
export type PrivateGroupsUsersAction = SetPrivateGroupsUsersAction
export type DarkThemeEnabledAction = ToggleDarkThemeAction

export type AppAction =
  | UserAction
  | GroupsAction
  | PrivateGroupsUsersAction
  | DarkThemeEnabledAction
