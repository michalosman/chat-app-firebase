import Chat from './components/Chat'
import Sidebar from './components/Sidebar'
import Login from './components/Login'
import { useAuthState } from 'react-firebase-hooks/auth'
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore'
import { auth, db } from './firebase'

import { Box } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from './state/actions'

const App = () => {
  const dispatch = useDispatch()

  const [user, loading] = useAuthState(auth)

  const userQuery = db.collection('users').doc(user?.uid)
  const [userData] = useDocumentData(userQuery)

  const groupsQuery = db.collection('groups').orderBy('name')
  const [groups] = useCollectionData(groupsQuery, { idField: 'id' })

  useEffect(() => {
    if (user) {
      dispatch(
        setUser({
          uid: userData?.uid,
          displayName: userData?.displayName,
          email: userData?.email,
          photoURL: userData?.photoURL,
          groups: userData?.groups || [],
        })
      )
    } else {
      dispatch(setUser(null))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData])

  useEffect(() => {
    if (user) {
      console.log(groups)
      // set groups
    } else {
      // reset groups
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, groups])

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
