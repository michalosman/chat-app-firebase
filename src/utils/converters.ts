import Group from '../types/Group'
import Message from '../types/Message'
import User from '../types/User'

const convertToUser = (userJSON: any): User => {
  const user: User = userJSON
  return user
}

const convertToGroup = (groupJSON: any): Group => {
  const group: Group = groupJSON
  return group
}

const convertToMessage = (messageJSON: any): Message => {
  const message: Message = messageJSON
  return message
}

const convertToUsers = (users: any): User[] => {
  if (!users) return []
  return users.map((userJSON: any) => convertToUser(userJSON))
}

const convertToGroups = (groups: any): Group[] => {
  if (!groups) return []
  return groups.map((groupJSON: any) => convertToGroup(groupJSON))
}

const convertToMessages = (messages: any): Group[] => {
  if (!messages) return []
  return messages.map((groupJSON: any) => convertToGroup(groupJSON))
}

export {
  convertToUser,
  convertToGroup,
  convertToMessage,
  convertToUsers,
  convertToGroups,
  convertToMessages,
}
