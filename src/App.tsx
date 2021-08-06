import Chat from './components/Chat'
import Sidebar from './components/Sidebar'

import { Box } from '@material-ui/core'

const App = () => {
  return (
    <Box display="flex" height="100vh">
      <Sidebar />
      <Chat />
    </Box>
  )
}

export default App
