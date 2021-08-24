import { Avatar, Input, List, ListItem, makeStyles } from '@material-ui/core'
import { useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useSelector } from 'react-redux'
import { db } from '../firebase'
import { AppState } from '../state/store/store'
import User from '../types/User'
import { convertToUsers } from '../utils/converters'

interface Props {
  onItemClick: (id: string) => void
}

const useStyles = makeStyles((theme) => ({
  input: {
    height: '38px',
    paddingRight: theme.spacing(1.5),
    paddingLeft: theme.spacing(1.5),
    marginBottom: theme.spacing(2),
    borderRadius: '4px',
  },

  list: {
    width: '105%',
    height: '121px',
    padding: '0',
    overflowY: 'scroll',
    overflowX: 'hidden',
  },

  li: {
    borderRadius: '4px',
    padding: theme.spacing(1),
  },

  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
}))

const UserSearchbox = ({ onItemClick }: Props) => {
  const classes = useStyles()
  const currentUser: User = useSelector((state: AppState) => state.user)
  const [input, setInput] = useState('')

  const usersQuery = db.collection('users').orderBy('displayName')
  const users = convertToUsers(useCollectionData(usersQuery)[0])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value)
  }

  const filterResults = (word: string, users: User[]) => {
    const regex = new RegExp(word, 'gi')
    return users.filter(
      (user) => user.displayName.match(regex) && user.uid !== currentUser.uid
    )
    // TODO: If already exists then open chat window / don't suggest user
  }

  const usersList = users
    ? filterResults(input, users).map((user) => (
        <ListItem
          key={user.uid}
          id={user.uid}
          className={classes.li}
          button
          onClick={(e: React.MouseEvent<HTMLDivElement>) =>
            onItemClick(e.currentTarget.id)
          }
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
