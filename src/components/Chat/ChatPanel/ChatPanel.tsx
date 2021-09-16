import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import User from '../../../types/User'
import PrivateMenu from './PrivateMenu'
import PublicMenu from './PublicMenu'
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
  const { groupID } = useParams<{ groupID: string }>()
  const currentUser = useSelector((state: AppState) => state.user)
  const groups = useSelector((state: AppState) => state.groups)
  const privateChatsUsers = useSelector(
    (state: AppState) => state.privateChatsUsers
  )
  const group = groups.filter((group) => group.id === groupID)[0]
  const [otherMember, setOtherMember] = useState<User>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (group) {
      if (group.type === 'private') {
        if (privateChatsUsers.length > 0) {
          const otherMemberID = group.members.filter(
            (memberID) => memberID !== currentUser.uid
          )[0]
          const otherMember = privateChatsUsers.find(
            (user) => user.uid === otherMemberID
          )
          setOtherMember(otherMember)
          setLoading(false)
        }
      } else {
        setOtherMember(undefined)
        setLoading(false)
      }
    }
  }, [group, privateChatsUsers, currentUser])

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
      {loading ? (
        <CircularProgress size="43px" />
      ) : (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <Avatar
              src={
                group.type === 'private'
                  ? otherMember?.photoURL
                  : `https://avatars.dicebear.com/api/initials/${group.name}.svg`
              }
            />
            <Box ml={1}>
              <Typography className={classes.bold}>
                {group.type === 'private'
                  ? otherMember?.displayName
                  : group.name}
              </Typography>
            </Box>
          </Box>
          {group.type === 'private' ? <PrivateMenu /> : <PublicMenu />}
        </Box>
      )}
    </Box>
  )
}

export default ChatPanel
