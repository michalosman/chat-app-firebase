import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ChatBox from './ChatBox'
import Chat from '../../../types/Chat'
import { AppState } from '../../../state/store/store'
import { getOtherPrivateChatMember } from '../../../utils'
import { Box } from '@material-ui/core'
import useStyles from './styles'

interface Props {
  search: string
}

const Chats = ({ search }: Props) => {
  const classes = useStyles()
  const chats = useSelector((state: AppState) => state.chats)
  const user = useSelector((state: AppState) => state.user)
  const { chatID } = useParams<{ chatID: string }>()

  const sortChats = (chats: Chat[]) => {
    return chats.sort((a, b) => {
      if (b.recentMessage.sentAt === null) return 1
      if (a.recentMessage.sentAt === null) return -1
      return a.recentMessage.sentAt < b.recentMessage.sentAt ? 1 : -1
    })
  }

  const filterChats = (chats: Chat[]) => {
    if (search === '') return chats
    if (search.includes('\\')) return []

    const regex = new RegExp(search, 'gi')
    return chats.filter((chat) =>
      chat.type === 'private'
        ? getOtherPrivateChatMember(chat, user.uid)?.displayName.match(regex)
        : chat.name.match(regex)
    )
  }

  const chatBoxes = sortChats(filterChats(chats)).map((chat) => (
    <ChatBox key={chat.id} chat={chat} isActive={chatID === chat.id} />
  ))

  return (
    <Box
      className={classes.scrollBox}
      display="flex"
      flexDirection="column"
      m={2}
      mr={1}
      flex={1}
    >
      {chatBoxes}
    </Box>
  )
}

export default Chats
