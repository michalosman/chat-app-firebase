import UserBar from './UserBar'
import ChatSearch from './ChatSearch'
import Chats from './Chats'
import { Box } from '@material-ui/core'
import { useState } from 'react'
import useStyles from './styles'

const Sidebar = () => {
  const classes = useStyles()
  const [search, setSearch] = useState('')

  return (
    <Box
      className={classes.sidebar}
      display="flex"
      flexDirection="column"
      width="361px"
      border={1}
      borderTop={0}
      borderBottom={0}
      borderLeft={0}
      borderColor={'divider'}
    >
      <UserBar />
      <ChatSearch search={search} setSearch={setSearch} />
      <Chats search={search} />
    </Box>
  )
}

export default Sidebar
