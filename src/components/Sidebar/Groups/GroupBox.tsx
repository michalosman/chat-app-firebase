import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Group from '../../../types/Group'
import User from '../../../types/User'
import { db } from '../../../firebase'
import { AppState } from '../../../state/store/store'
import { convertDocToUser } from '../../../utils/converters'

import { Avatar, Box, Button, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: 'none',
  },

  active: {
    backgroundColor: theme.palette.action.selected,
  },

  avatar: {
    width: '50px',
    height: '50px',
  },

  link: {
    textDecoration: 'none',
  },
}))

interface Props {
  group: Group
  isActive: boolean
  setLoading: (loading: boolean) => void
}

const GroupBox = ({ group, isActive, setLoading }: Props) => {
  const classes = useStyles()
  const currentUser = useSelector((state: AppState) => state.user)
  const [otherUser, setOtherUser] = useState<User>()

  useEffect(() => {
    let unsubscribe = () => {}

    if (group.type === 'private') {
      setLoading(true)

      const otherUserID = group.members.filter(
        (memberID) => memberID !== currentUser.uid
      )[0]

      unsubscribe = db
        .collection('users')
        .doc(otherUserID)
        .onSnapshot((snapshot) => {
          setOtherUser(convertDocToUser(snapshot))
          setLoading(false)
        })
    } else {
      setLoading(false)
    }

    return () => {
      unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const formatMessage = (message: string) => {
    return message.length < 20 ? message : message.substr(0, 20) + '...'
  }

  return (
    <Link className={classes.link} to={`/${group.id}`}>
      <Button
        className={`${classes.button} ${isActive ? classes.active : ''}`}
        fullWidth
      >
        <Box display="flex" alignItems="center" width="100%" p={1}>
          <Avatar
            className={classes.avatar}
            src={
              group.type === 'public'
                ? `https://avatars.dicebear.com/api/initials/${group.name}.svg
    `
                : `${otherUser?.photoURL}`
            }
          />
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            ml={2}
          >
            <Typography align="left">
              {group.type === 'public' ? group.name : otherUser?.displayName}
            </Typography>
            <Typography variant="caption" color="textSecondary" align="left">
              {group.recentMessage
                ? `${formatMessage(group.recentMessage.text)}`
                : `${formatMessage(
                    group.createdBy.displayName
                  )} started a chat`}
            </Typography>
          </Box>
        </Box>
      </Button>
    </Link>
  )
}

export default GroupBox
