import Chat from './components/Chat'
import Sidebar from './components/Sidebar'
import Login from './components/Login'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from './firebase'

import { Box } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setGroups, setUser } from './state/actions'
import { convertToGroup, convertToUser } from './utils/converters'
import { USER_INIT_STATE } from './state/reducers/user'

const App = () => {
  const [user, loading] = useAuthState(auth)
  const dispatch = useDispatch()

  useEffect(() => {
    let unsubscribeUser = () => {}
    let unsubscribeGroups = () => {}

    if (user) {
      unsubscribeUser = db
        .collection('users')
        .doc(user.uid)
        .onSnapshot((snapshot) =>
          dispatch(setUser(convertToUser(snapshot.data())))
        )

      unsubscribeGroups = db
        .collection('groups')
        .where('members', 'array-contains', user.uid)
        .onSnapshot((snapshot) => {
          dispatch(
            setGroups(snapshot.docs.map((doc) => convertToGroup(doc.data())))
          )
        })
    } else {
      dispatch(setUser(USER_INIT_STATE))
      dispatch(setGroups([]))
    }

    return () => {
      unsubscribeUser()
      unsubscribeGroups()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

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
