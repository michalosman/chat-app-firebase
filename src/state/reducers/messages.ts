import Message from '../../types/Message'
import { AppAction, SET_MESSAGES } from '../../types/actions'

const INIT_STATE: Message[] = []

const messagesReducer = (state = INIT_STATE, action: AppAction): Message[] => {
  switch (action.type) {
    case SET_MESSAGES:
      return action.messages
    default:
      return state
  }
}

export default messagesReducer
