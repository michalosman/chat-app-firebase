import ChatPanel from './ChatPanel/ChatPanel'
import Messages from './Messages'
import SendBox from './SendBox'

import { Box } from '@material-ui/core'

const Chat = () => {
  return (
    <Box display="flex" flexDirection="column" flex={1}>
      <ChatPanel />
      <Messages />
      <SendBox />
    </Box>
  )
}

export default Chat
