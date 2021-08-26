import { Avatar, Box, Button, Typography, makeStyles } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { db } from '../../../firebase'
import { AppState } from '../../../state/store/store'
import Group from '../../../types/Group'
import User from '../../../types/User'
import { convertDocToUser } from '../../../utils/converters'

interface Props {
  group: Group
  isActive: boolean
  setActiveGroupID: (id: string) => void
}

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
}))

const GroupBox = ({ group, isActive, setActiveGroupID }: Props) => {
  const classes = useStyles()
  const currentUser = useSelector((state: AppState) => state.user)
  const [otherUser, setOtherUser] = useState<User>()

  useEffect(() => {
    let unsubscribe = () => {}

    if (group.type === 'private') {
      const otherUserID = group.members.filter(
        (id) => id !== currentUser.uid
      )[0]
      unsubscribe = db
        .collection('users')
        .doc(otherUserID)
        .onSnapshot((snapshot) => setOtherUser(convertDocToUser(snapshot)))
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
    <div>
      <Button
        className={`${classes.button} ${isActive ? classes.active : ''}`}
        onClick={() => setActiveGroupID(group.id)}
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
                  )} created a chat`}
            </Typography>
          </Box>
        </Box>
      </Button>
    </div>
  )
}

export default GroupBox
