import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import Chat from './components/Chat'
import Sidebar from './components/Sidebar'
import Login from './components/Login'
import User from './types/User'
import { auth, db } from './firebase'
import { setGroups, setPrivateGroupsUsers, setUser } from './state/actions'
import { convertDocToGroup, convertDocToUser } from './utils/converters'
import { USER_INIT_STATE } from './state/reducers/user'
import { AppState } from './state/store/store'

import CircularProgress from '@material-ui/core/CircularProgress'
import { Box } from '@material-ui/core'
import { getOtherPrivateGroupMember } from './utils/utils'

const App = () => {
  const [user, loading] = useAuthState(auth)
  const dispatch = useDispatch()
  const groups = useSelector((state: AppState) => state.groups)
  const privateGroupsUsers = useSelector(
    (state: AppState) => state.privateGroupsUsers
  )

  useEffect(() => {
    let unsubscribeGroups = () => {}

    if (user) {
      db.collection('users')
        .doc(user.uid)
        .get()
        .then((snapshot) => dispatch(setUser(convertDocToUser(snapshot))))

      unsubscribeGroups = db
        .collection('groups')
        .where('members', 'array-contains', user.uid)
        .onSnapshot((snapshot) =>
          dispatch(
            setGroups(snapshot.docs.map((doc) => convertDocToGroup(doc)))
          )
        )
    } else {
      dispatch(setUser(USER_INIT_STATE))
      dispatch(setGroups([]))
    }

    return () => {
      unsubscribeGroups()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  useEffect(() => {
    if (user && groups.length > 0) {
      const privateGroups = groups.filter((group) => group.type === 'private')

      if (privateGroups.length !== privateGroupsUsers.length) {
        // TODO: Some kind of loading indicator instead of emptying, same for groups
        dispatch(setPrivateGroupsUsers([]))

        db.collection('users')
          .get()
          .then((snapshot) => {
            const users = snapshot.docs.map((doc) => convertDocToUser(doc))
            const newPrivateGroupsUsers: User[] = []

            for (const group of privateGroups) {
              const otherMember = getOtherPrivateGroupMember(
                group,
                user.uid,
                users
              )
              if (otherMember) {
                newPrivateGroupsUsers.push(otherMember)
              }
            }
            dispatch(setPrivateGroupsUsers(newPrivateGroupsUsers))
          })
      }
    } else {
      dispatch(setPrivateGroupsUsers([]))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, groups.length])

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
