import { useParams } from 'react-router-dom'
import ChatPanel from './ChatPanel'
import Messages from './Messages'
import SendBox from './SendBox'

import { Box } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { AppState } from '../../state/store/store'

const Chat = () => {
  const { groupID } = useParams<{ groupID: string }>()
  const groups = useSelector((state: AppState) => state.groups)

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
