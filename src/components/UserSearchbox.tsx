import { Avatar, Input, List, ListItem, makeStyles } from '@material-ui/core'
import { Dispatch, SetStateAction, useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db } from '../firebase'
import User from '../types/User'
import { convertUsers } from '../utils/converters'

interface Props {
  setSelectedUserID: Dispatch<SetStateAction<string>>
}

const useStyles = makeStyles((theme) => ({
  input: {
    height: '38px',
    paddingRight: theme.spacing(1.5),
    paddingLeft: theme.spacing(1.5),
    borderRadius: '4px',
  },

  list: {
    width: '105%',
    height: '135px',
    padding: '0',
    borderRadius: '4px',
    overflow: 'scroll',
  },

  li: {
    padding: theme.spacing(1),
  },

  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
}))

const UserSearchbox = ({ setSelectedUserID }: Props) => {
  const classes = useStyles()
  const [input, setInput] = useState('')

  const usersQuery = db.collection('users').orderBy('displayName')
  const users = convertUsers(useCollectionData(usersQuery)[0])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value)
    setSelectedUserID('')
  }

  const filterResults = (word: string, users: User[]) => {
    const regex = new RegExp(word, 'gi')
    return users.filter((user) => user.displayName.match(regex))
  }

  const handleLiClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.currentTarget.textContent) setInput(e.currentTarget.textContent)
    setSelectedUserID(e.currentTarget.id)
  }

  const usersList = users
    ? filterResults(input, users).map((user) => (
        <ListItem
          key={user.uid}
          id={user.uid}
          className={classes.li}
          button
          onClick={handleLiClick}
        >
          <Avatar className={classes.avatar} src={user.photoURL} />
          <div>{user.displayName}</div>
        </ListItem>
      ))
    : []

  return (
    <div>
      <Input
        className={classes.input}
        placeholder="Search person"
        onChange={handleInput}
        value={input}
        disableUnderline
        required
      />
      <List className={classes.list}>
        {usersList}
        {usersList}
        {usersList}
        {usersList}
      </List>
    </div>
  )
}

export default UserSearchbox
