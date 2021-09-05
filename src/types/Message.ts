interface Message {
  id: string
  text: string
  sentAt: string
  sentBy: {
    uid: string
    displayName: string
  }
}

export default Message
