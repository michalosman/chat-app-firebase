import { AppAction, SET_CHATS } from '../types/actions'
import Chat from '../types/Chat'

const INIT_STATE: Chat[] = []

const chatsReducer = (state = INIT_STATE, action: AppAction): Chat[] => {
  switch (action.type) {
    case SET_CHATS:
      return action.chats
    default:
      return state
  }
}

export { INIT_STATE as CHATS_INIT_STATE }

export default chatsReducer
