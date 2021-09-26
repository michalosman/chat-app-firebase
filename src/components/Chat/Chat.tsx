import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ChatPanel from './ChatPanel'
import Messages from './Messages'
import SendBox from './SendBox'
import { AppState } from '../../state/store/store'

import { Box } from '@material-ui/core'

const Chat = () => {
  const groups = useSelector((state: AppState) => state.groups)
  const { groupID } = useParams<{ groupID: string }>()

  return groups.find((group) => group.id === groupID) ? (
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
