import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import User from '../../../types/User'
import Group from '../../../types/Group'
import PrivateMenu from './PrivateMenu'
import PublicMenu from './PublicMenu'
import { AppState } from '../../../state/store/store'
import { LoadingContext } from '../../../App'
import {
  cutText,
  formatDate,
  getOtherPrivateGroupMember,
} from '../../../utils/utils'

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
  const groups = useSelector((state: AppState) => state.groups)
  const privateGroupsUsers = useSelector(
    (state: AppState) => state.privateGroupsUsers
  )
  const loading = useContext(LoadingContext)
  const { groupID } = useParams<{ groupID: string }>()
  const [group, setGroup] = useState<Group>()
  const [otherMember, setOtherMember] = useState<User>()

  useEffect(() => {
    setGroup(groups.find((group) => group.id === groupID))

    if (group) {
      if (group.type === 'private') {
        const otherMember = getOtherPrivateGroupMember(
          group,
          currentUser.uid,
          privateGroupsUsers
        )
        setOtherMember(otherMember)
      } else {
        setOtherMember(undefined)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups, privateGroupsUsers, groupID, group])

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
      ) : group ? (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <Avatar
              src={
                group.type === 'private'
                  ? otherMember?.photoURL
                  : `https://avatars.dicebear.com/api/initials/${group.name}.svg`
              }
            />
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              ml={1}
            >
              <Typography className={classes.bold}>
                {group.type === 'private'
                  ? otherMember
                    ? cutText(otherMember.displayName, 24)
                    : ''
                  : cutText(group.name, 24)}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {`Last message at ${
                  group.recentMessage
                    ? formatDate(group.recentMessage.sentAt)
                    : formatDate(group.createdAt)
                }`}
              </Typography>
            </Box>
          </Box>
          {group.type === 'private' ? (
            <PrivateMenu />
          ) : (
            <PublicMenu
              group={group}
              isOwner={group.createdBy.uid === currentUser.uid}
            />
          )}
        </Box>
      ) : (
        ''
      )}
    </Box>
  )
}

export default ChatPanel
