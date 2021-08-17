import { AppAction, SET_MESSAGES } from '../../types/actions'
import Message from '../../types/Message'

const setMessages = (messages: Message[]): AppAction => {
  return {
    type: SET_MESSAGES,
    messages,
  }
}

export { setMessages }
