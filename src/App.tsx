import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import Chat from './components/Chat'
import Sidebar from './components/Sidebar'
import Login from './components/Login'
import { auth, db } from './firebase'
import { setGroups, setPrivateChatsUsers, setUser } from './state/actions'
import { convertDocToGroup, convertDocToUser } from './utils/converters'
import { USER_INIT_STATE } from './state/reducers/user'

import { Box } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import { AppState } from './state/store/store'

const App = () => {
  const [user, loading] = useAuthState(auth)
  const dispatch = useDispatch()
  const privateChatsUsers = useSelector(
    (state: AppState) => state.privateChatsUsers
  )

  useEffect(() => {
    let unsubscribeUser = () => {}
    let unsubscribeGroups = () => {}

    if (user) {
      unsubscribeUser = db
        .collection('users')
        .doc(user.uid)
        .onSnapshot((snapshot) => dispatch(setUser(convertDocToUser(snapshot))))

      unsubscribeGroups = db
        .collection('groups')
        .where('members', 'array-contains', user.uid)
        .onSnapshot((snapshot) => {
          dispatch(
            setGroups(snapshot.docs.map((doc) => convertDocToGroup(doc)))
          )

          const privateChats = snapshot.docs
            .map((doc) => convertDocToGroup(doc))
            .filter((group) => group.type === 'private')

          if (privateChats.length !== privateChatsUsers.length) {
            db.collection('users')
              .get()
              .then((snapshot) => {
                const users = snapshot.docs.map((doc) => doc.data())
                // TODO
                // get all otherUsers IDs from privateChats
                // filter users to contain only above
                // dispatch
                dispatch(setPrivateChatsUsers([]))
              })
          }
        })
    } else {
      dispatch(setUser(USER_INIT_STATE))
      dispatch(setGroups([]))
      dispatch(setPrivateChatsUsers([]))
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
        <Box m="auto">
          <CircularProgress size="150px" />
        </Box>
      ) : user ? (
        <Router>
          <Route exact path={['/', '/:groupID']}>
            <Sidebar />
            <Chat />
          </Route>
        </Router>
      ) : (
        <Login />
      )}
    </Box>
  )
}

export default App
