import Chat from './components/Chat'
import Sidebar from './components/Sidebar'
import Login from './components/Login'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase'

import { Box } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'

const App = () => {
  const [user, loading] = useAuthState(auth)

  return (
    <Box display="flex" height="100vh">
      {loading ? (
        <Box margin="auto">
          <CircularProgress size="150px" />
        </Box>
      ) : user ? (
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
