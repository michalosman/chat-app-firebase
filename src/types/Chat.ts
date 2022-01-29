import Message from './Message'
import User from './User'

interface Chat {
  id: string
  name: string
  type: string
  members: User[]
  recentMessage: Message
  createdBy: string
  createdAt: string
}

export default Chat
