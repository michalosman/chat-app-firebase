import Group from '../types/Group'
import Message from '../types/Message'
import User from '../types/User'

const convertDocToUser = (doc: any): User => {
  const user: User = {
    uid: doc.data().uid,
    displayName: doc.data().displayName,
    email: doc.data().email,
    photoURL: doc.data().photoURL,
  }
  return user
}

const convertJSONToUser = (obj: any): User => {
  const user: User = {
    uid: obj.uid,
    displayName: obj.displayName,
    email: obj.email,
    photoURL: obj.photoURL,
  }
  return user
}

const convertDocToGroup = (doc: any): Group => {
  const group: Group = {
    id: doc.id,
    name: doc.data().name,
    createdBy: doc.data().createdBy,
    type: doc.data().type,
    members: doc.data().members,
    recentMessage: doc.data().recentMessage,
  }
  return group
}

const convertDocToMessage = (doc: any): Message => {
  const message: Message = {
    id: doc.id,
    text: doc.data().text,
    sentBy: doc.data().sentBy,
    sentAt: doc.data().sentAt,
  }
  return message
}

export {
  convertDocToUser,
  convertJSONToUser,
  convertDocToGroup,
  convertDocToMessage,
}
