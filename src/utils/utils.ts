import Group from '../types/Group'
import User from '../types/User'

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

export { getOtherPrivateGroupMember }
