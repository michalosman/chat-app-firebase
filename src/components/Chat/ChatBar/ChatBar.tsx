import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import User from '../../../types/User'
import Chat from '../../../types/Chat'
import PrivateMenu from './PrivateMenu'
import PublicMenu from './PublicMenu'
import { AppState } from '../../../store'
import { cutText, formatDate, getOtherPrivateChatMember } from '../../../utils'
import { Avatar, Box, Typography } from '@material-ui/core'
import useStyles from './styles'

const ChatBar = () => {
  const classes = useStyles()
  const user = useSelector((state: AppState) => state.user)
  const chats = useSelector((state: AppState) => state.chats)
  const { chatID } = useParams<{ chatID: string }>()
  const [chat, setChat] = useState<Chat>()
  const [otherMember, setOtherMember] = useState<User>()

  useEffect(() => {
    setChat(chats.find((chat) => chat.id === chatID))

    if (chat) {
      if (chat.type === 'private') {
        const otherMember = getOtherPrivateChatMember(chat, user.uid)
        setOtherMember(otherMember)
      } else {
        setOtherMember(undefined)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chats, chatID, chat])

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
      {chat ? (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <Avatar
              src={
                chat.type === 'private'
                  ? otherMember?.photoURL
                  : `https://avatars.dicebear.com/api/initials/${chat.name}.svg`
              }
            />
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              ml={1}
            >
              <Typography className={classes.bold}>
                {chat.type === 'private'
                  ? otherMember
                    ? cutText(otherMember.displayName, 24)
                    : ''
                  : cutText(chat.name, 24)}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {` ${
                  chat.recentMessage
                    ? 'Last message at ' + formatDate(chat.recentMessage.sentAt)
                    : 'Created at ' + formatDate(chat.createdAt)
                }`}
              </Typography>
            </Box>
          </Box>
          {chat.type === 'private' ? (
            <PrivateMenu />
          ) : (
            <PublicMenu chat={chat} isOwner={chat.createdBy === user.uid} />
          )}
        </Box>
      ) : (
        ''
      )}
    </Box>
  )
}

export default ChatBar
