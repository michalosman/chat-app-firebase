import { AppAction, SET_CHATS } from '../types/actions'
import Chat from '../types/Chat'

const setChats = (chats: Chat[]): AppAction => {
  return {
    type: SET_CHATS,
    chats,
  }
}

export { setChats }
