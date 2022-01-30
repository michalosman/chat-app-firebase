import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Chat from '../../../../types/Chat'
import { AppState } from '../../../../store'
import {
  cutText,
  formatDate,
  getOtherPrivateChatMember,
} from '../../../../utils'
import { Avatar, Box, Button, Typography } from '@material-ui/core'
import useStyles from './styles'
import { useParams } from 'react-router-dom'

interface Props {
  chat: Chat
}

const ChatButton = ({ chat }: Props) => {
  const classes = useStyles()
  const user = useSelector((state: AppState) => state.user)
  const otherMember = getOtherPrivateChatMember(chat, user.uid)
  const { chatID } = useParams<{ chatID: string }>()
  const isActive = chatID === chat.id

  return (
    <Link className={classes.link} to={`/${chat.id}`}>
      <Button
        className={`${classes.button} ${isActive ? classes.active : ''}`}
        fullWidth
      >
        <Box display="flex" alignItems="center" width="100%" p={1}>
          <Avatar
            className={classes.avatar}
            src={
              chat.type === 'private'
                ? `${otherMember?.photoURL}`
                : `https://avatars.dicebear.com/api/initials/${chat.name}.svg
                `
            }
          />
          <Box display="flex" flexDirection="column" ml={2} width="100%">
            <Typography align="left">
              {chat.type === 'private'
                ? otherMember
                  ? cutText(otherMember.displayName, 17)
                  : ''
                : cutText(chat.name, 14)}
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="caption" color="textSecondary">
                {chat.recentMessage
                  ? `${cutText(chat.recentMessage.text, 12)}`
                  : ``}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {`${
                  chat.recentMessage
                    ? formatDate(chat.recentMessage.sentAt)
                    : formatDate(chat.createdAt)
                }`}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Button>
    </Link>
  )
}

export default ChatButton
