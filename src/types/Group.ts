import Message from "./Message";

export default interface Group {
  id: string
  name: string
  type: string
  members: string[]
  cratedBy: string
  createdAt: string
  recentMessage: Message
}
