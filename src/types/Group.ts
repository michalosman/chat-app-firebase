import Message from "./Message";

interface Group {
  id: string
  name: string
  type: string
  members: string[]
  cratedBy: string
  createdAt: string
  recentMessage: Message
}

export default Group
