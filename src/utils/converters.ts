import User from '../types/User'

const convertUsers = (users: any): User[] => {
  if (!users) return []

  return users.map((userJSON: any) => {
    const user: User = userJSON
    return user
  })
}

export { convertUsers }
