import Message from './Message'

interface Group {
  id: string
  name: string
  type: string
  members: string[]
  createdBy: string
  recentMessage: Message
}

export default Group
