import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import User from '../../../types/User'
import PrivateMenu from './PrivateMenu'
import GroupMenu from './GroupMenu'
import { db } from '../../../firebase'
import { convertDocToUser } from '../../../utils/converters'
import { AppState } from '../../../state/store/store'

import {
  Avatar,
  Box,
  CircularProgress,
  makeStyles,
  Typography,
} from '@material-ui/core'

const useStyles = makeStyles(() => ({
  bold: {
    fontWeight: 700,
  },
}))

const ChatPanel = () => {
  const classes = useStyles()
  const currentUser = useSelector((state: AppState) => state.user)
  const [otherUser, setOtherUser] = useState<User>()
  const { groupID } = useParams<{ groupID: string }>()
  const groups = useSelector((state: AppState) => state.groups)
  const group = groups.filter((group) => group.id === groupID)[0]
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let unsubscribe = () => {}

    if (group) {
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
        setOtherUser(undefined)
        setLoading(false)
      }
    }

    return () => {
      unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group])

  return (
    <Box
      px={2}
      py={1}
      border={1}
      borderTop={0}
      borderRight={0}
      borderLeft={0}
      borderColor={'divider'}
    >
      {group && !loading ? (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex">
            <Avatar
              src={
                group.type === 'private'
                  ? otherUser?.photoURL
                  : `https://avatars.dicebear.com/api/initials/${group.name}.svg`
              }
            />
            <Box ml={2}>
              <Typography className={classes.bold}>
                {group.type === 'private' ? otherUser?.displayName : group.name}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Last message sent
              </Typography>
            </Box>
          </Box>
          {group.type === 'private' ? <PrivateMenu /> : <GroupMenu />}
        </Box>
      ) : (
        <CircularProgress size="43px" />
      )}
    </Box>
  )
}

export default ChatPanel
