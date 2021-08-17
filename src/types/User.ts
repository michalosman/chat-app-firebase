interface User {
  uid: string
  displayName: string
  email: string
  photoURL: string
  groups: string[]
}

type UserNullable = User | null 

export default UserNullable