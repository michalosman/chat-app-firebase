import Message from './Message'

interface Group {
  id: string
  name: string
  type: string
  members: string[]
  createdBy: {
    uid: string
    displayName: string
  }
  recentMessage: Message
}

export default Group
