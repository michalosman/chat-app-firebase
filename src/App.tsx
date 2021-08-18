import Chat from './components/Chat'
import Sidebar from './components/Sidebar'
import Login from './components/Login'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { auth, db } from './firebase'

import { Box } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useEffect } from 'react'

const App = () => {
  const [user, loading] = useAuthState(auth)

  const groupsQuery = db.collection('groups').orderBy('name', 'asc')
  const [groups] = useCollectionData(groupsQuery, { idField: 'id' })

  useEffect(() => {
    if (user) {
      console.log(user)
      // set user
    } else {
      // reset user
    }
  }, [user])

  useEffect(() => {
    if (user) {
      console.log(groups)
      // set groups
    } else {
      // reset groups
    }
  }, [user, groups])

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
