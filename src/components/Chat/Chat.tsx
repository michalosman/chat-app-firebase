import { Box } from '@material-ui/core'
import ChatPanel from './ChatPanel'
import Messages from './Messages'
import SendBox from './SendBox'

const Chat = () => {
  return (
    <Box flex={1}>
      <ChatPanel />
      <Messages />
      <SendBox />
    </Box>
  )
}

export default Chat
