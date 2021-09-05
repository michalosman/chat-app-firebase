interface Group {
  id: string
  name: string
  type: string
  members: string[]
  createdBy: {
    uid: string
    displayName: string
  }
  recentMessage: {
    text: string
    sentBy: {
      uid: string
      displayName: string
    }
    sentAt: string
  }
}

export default Group
