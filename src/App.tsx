import { useAuthState } from 'react-firebase-hooks/auth'
import Chat from './components/Chat'
import Sidebar from './components/Sidebar'
import { auth } from './firebase'

import { Box } from '@material-ui/core'
import Login from './components/Login'

const App = () => {
  const [user, loading] = useAuthState(auth)

  return (
    <Box display="flex" height="100vh">
      {user ? (
        <>
          <Sidebar />
          <Chat />
        </>
      ) : loading ? (
        ''
      ) : (
        <Login />
      )}
    </Box>
  )
}

export default App
