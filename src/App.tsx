import Chat from './components/Chat'
import Sidebar from './components/Sidebar'

import { Box } from '@material-ui/core'
import Login from './components/Login'

const App = () => {
  const user = false

  return (
    <Box display="flex" height="100vh">
      {user ? (
        <>
          <Sidebar />
          <Chat />
        </>
      ) : (
        <Login />
      )}
    </Box>
  )
}

export default App
