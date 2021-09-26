import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import User from '../../../types/User'
import Group from '../../../types/Group'
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
import { getOtherPrivateGroupMember } from '../../../utils/utils'

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
  const { groupID } = useParams<{ groupID: string }>()
  const [group, setGroup] = useState<Group>()
  const [otherMember, setOtherMember] = useState<User>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setGroup(groups.filter((group) => group.id === groupID)[0])

    if (group) {
      if (group.type === 'private') {
        if (privateGroupsUsers.length > 0) {
          const otherMember = getOtherPrivateGroupMember(
            group,
            currentUser.uid,
            privateGroupsUsers
          )
          setOtherMember(otherMember)
          setLoading(false)
        }
      } else {
        setOtherMember(undefined)
        setLoading(false)
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
      ) : (
        ''
      )}
    </Box>
  )
}

export default ChatPanel
