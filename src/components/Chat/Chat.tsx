import { useParams } from 'react-router-dom'
import ChatPanel from './ChatPanel'
import Messages from './Messages'
import SendBox from './SendBox'

import { Box } from '@material-ui/core'

const Chat = () => {
  const { groupID } = useParams<{ groupID: string }>()

  return groupID ? (
    <Box display="flex" flexDirection="column" flex={1}>
      <ChatPanel />
      <Messages />
      <SendBox />
    </Box>
  ) : (
    <></>
  )
}

export default Chat
