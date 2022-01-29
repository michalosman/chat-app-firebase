import Chat from '../types/Chat'
import Message from '../types/Message'
import User from '../types/User'
import dayjs from 'dayjs'

export const convertDocToUser = (doc: any): User => {
  const user: User = {
    uid: doc.data().uid,
    displayName: doc.data().displayName,
    email: doc.data().email,
    photoURL: doc.data().photoURL,
  }
  return user
}

export const convertDocToChat = (doc: any): Chat => {
  const chat: Chat = {
    id: doc.id,
    name: doc.data().name,
    createdAt: doc.data().createdAt,
    createdBy: doc.data().createdBy,
    type: doc.data().type,
    members: doc.data().members,
    recentMessage: doc.data().recentMessage,
  }
  return chat
}

export const convertDocToMessage = (doc: any): Message => {
  const message: Message = {
    id: doc.id,
    text: doc.data().text,
    sentBy: doc.data().sentBy,
    sentAt: doc.data().sentAt,
  }
  return message
}

export const getOtherPrivateChatMember = (chat: Chat, excludedID: string) => {
  if (chat.type !== 'private') return
  const otherMember = chat.members.filter(
    (member) => member.uid !== excludedID
  )[0]
  return otherMember
}

export const getOtherPrivateChatsMembers = (
  chats: Chat[],
  excludedID: string
) => {
  return chats.map((chat) => getOtherPrivateChatMember(chat, excludedID)?.uid)
}

export const cutText = (text: string, length: number) => {
  return text.length <= length ? text : text.substr(0, length) + '...'
}

export const formatDate = (time: any) => {
  if (!time) return dayjs(new Date()).format(`DD/MM HH:mm`)
  return dayjs(new Date(time.toDate())).format(`DD/MM HH:mm`)
}
