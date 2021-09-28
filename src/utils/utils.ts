import Group from '../types/Group'
import User from '../types/User'
import dayjs from 'dayjs'

const getOtherPrivateGroupMember = (
  group: Group,
  excludedID: string,
  possibleUsers: User[]
) => {
  if (group.type !== 'private') return
  const otherMemberID = group.members.filter(
    (memberID) => memberID !== excludedID
  )[0]
  const otherMember = possibleUsers.find((user) => user.uid === otherMemberID)
  return otherMember
}

const cutText = (text: string, length: number) => {
  return text.length <= length ? text : text.substr(0, length) + '...'
}

const formatDate = (time: any) => {
  if (!time) return dayjs(new Date()).format(`DD/MM HH:mm`)
  return dayjs(new Date(time.toDate())).format(`DD/MM HH:mm`)
}

export { getOtherPrivateGroupMember, cutText, formatDate }
