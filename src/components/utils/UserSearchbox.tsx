import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import User from '../../types/User'
import { db } from '../../firebase'
import { AppState } from '../../state/store/store'
import { convertDocToUser } from '../../utils/converters'

import {
  Avatar,
  Box,
  Button,
  Input,
  List,
  ListItem,
  makeStyles,
} from '@material-ui/core'

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

interface Props {
  onItemClick: (id: string) => void
  onCancel: () => void
  avoidIdList?: string[]
}

const UserSearchbox = ({ onItemClick, onCancel, avoidIdList }: Props) => {
  const classes = useStyles()
  const currentUser = useSelector((state: AppState) => state.user)
  const [input, setInput] = useState('')
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    db.collection('users')
      .orderBy('displayName')
      .get()
      .then((snapshot) => {
        setUsers(snapshot.docs.map((doc) => convertDocToUser(doc)))
      })
  }, [])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value)
  }

  const filterResults = (word: string, users: User[]) => {
    const regex = new RegExp(word, 'gi')
    return users.filter(
      (user) =>
        user.displayName.match(regex) &&
        user.uid !== currentUser.uid &&
        !avoidIdList?.find((IdToAvoid) => IdToAvoid === user.uid)
    )
  }

  const usersList = filterResults(input, users).map((user) => (
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
      {user.displayName}
    </ListItem>
  ))

  return (
    <Box p={2}>
      <Input
        className={classes.input}
        placeholder="Search person"
        onChange={handleInput}
        value={input}
        disableUnderline
        required
        autoFocus
      />
      <List className={classes.list}>{usersList}</List>
      <Button
        color="secondary"
        variant="contained"
        onClick={onCancel}
        fullWidth
      >
        Cancel
      </Button>
    </Box>
  )
}

export default UserSearchbox
