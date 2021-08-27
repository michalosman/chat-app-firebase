import { useSelector } from 'react-redux'
import { AppState } from '../../../state/store/store'
import PrivateMenu from './PrivateMenu'
import GroupMenu from './GroupMenu'

import { Avatar, Box, makeStyles, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import User from '../../../types/User'
import { db } from '../../../firebase'
import { convertDocToUser } from '../../../utils/converters'
import { useParams } from 'react-router-dom'

const useStyles = makeStyles(() => ({
  bold: {
    fontWeight: 700,
  },
}))

interface Props {
  setLoading: (loading: boolean) => void
}

const ChatPanel = ({ setLoading }: Props) => {
  const classes = useStyles()
  const currentUser = useSelector((state: AppState) => state.user)
  const [otherUser, setOtherUser] = useState<User>()
  const { groupID } = useParams<{ groupID: string }>()
  const groups = useSelector((state: AppState) => state.groups)
  const group = groups.filter((group) => group.id === groupID)[0]

  useEffect(() => {
    let unsubscribe = () => {}

    setLoading(true)

    if (group) {
      if (group.type === 'private') {
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
    }

    return () => {
      unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group])

  return group ? (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px={2}
      py={1}
      border={1}
      borderTop={0}
      borderRight={0}
      borderLeft={0}
      borderColor={'divider'}
    >
      <Box display="flex" alignItems="center">
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
    <></>
  )
}

export default ChatPanel
