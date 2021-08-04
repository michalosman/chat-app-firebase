import Box from '@material-ui/core/Box'
import Chat from './components/Chat/Chat'
import Sidebar from './components/Sidebar/Sidebar'

const App = () => {
  return (
    <Box display="flex" height="100vh">
      <Sidebar />
      <Chat />
    </Box>
  )
}

export default App
