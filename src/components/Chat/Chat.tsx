import { useParams } from 'react-router-dom'
import { useState } from 'react'
import ChatPanel from './ChatPanel'
import Messages from './Messages'
import SendBox from './SendBox'

import { Box, CircularProgress } from '@material-ui/core'

const Chat = () => {
  const { groupID } = useParams<{ groupID: string }>()
  const [loading, setLoading] = useState(true)

  return (
    <>
      <Box
        display={loading && groupID ? 'flex' : 'none'}
        justifyContent="center"
        alignItems="center"
        flex={1}
      >
        <CircularProgress size="50px" />
      </Box>
      <Box display={loading ? 'none' : 'flex'} flexDirection="column" flex={1}>
        <ChatPanel setLoading={setLoading} />
        <Messages />
        <SendBox />
      </Box>
    </>
  )
}

export default Chat
