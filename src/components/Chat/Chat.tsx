import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ChatBar from './ChatBar'
import Messages from './Messages'
import SendBox from './SendBox'
import { AppState } from '../../store'
import { Box } from '@material-ui/core'

const Chat = () => {
  const chats = useSelector((state: AppState) => state.chats)
  const { chatID } = useParams<{ chatID: string }>()

  if (!chats.find((chat) => chat.id === chatID)) return <></>

  return (
    <Box display="flex" flexDirection="column" flex={1}>
      <ChatBar />
      <Messages />
      <SendBox />
    </Box>
  )
}

export default Chat
