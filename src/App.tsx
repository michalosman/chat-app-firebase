import { createContext, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import Chat from './components/Chat'
import Sidebar from './components/Sidebar'
import Login from './components/Login'
import User from './types/User'
import { auth, db } from './firebase'
import { setGroups, setPrivateGroupsUsers, setUser } from './state/actions'
import { convertDocToGroup, convertDocToUser } from './utils/converters'
import { getOtherPrivateGroupMember } from './utils/utils'
import { USER_INIT_STATE } from './state/reducers/user'
import { GROUPS_INIT_STATE } from './state/reducers/groups'
import { PRIVATE_GROUPS_USERS_INIT_STATE } from './state/reducers/privateGroupsUsers'

import CircularProgress from '@material-ui/core/CircularProgress'
import { Box } from '@material-ui/core'

export const LoadingContext = createContext(true)

const App = () => {
  const [user, loadingUserAuth] = useAuthState(auth)
  const [loadingUserData, setLoadingUserData] = useState(true)
  const [loadingGroupsData, setLoadingGroupsData] = useState(true)
  const dispatch = useDispatch()
  const previousGroupsLength = useRef(0)
  const previousPrivateGroupsLength = useRef(0)

  useEffect(() => {
    let unsubscribe = () => {}

    if (user) {
      db.collection('users')
        .doc(user.uid)
        .get()
        .then((snapshot) => {
          dispatch(setUser(convertDocToUser(snapshot)))
          setLoadingUserData(false)
        })

      unsubscribe = db
        .collection('groups')
        .where('members', 'array-contains', user.uid)
        .onSnapshot((snapshot) => {
          setLoadingGroupsData(true)
          const groups = snapshot.docs.map((doc) => convertDocToGroup(doc))

          if (groups.length === 0) {
            dispatch(setGroups(GROUPS_INIT_STATE))
            dispatch(setPrivateGroupsUsers(PRIVATE_GROUPS_USERS_INIT_STATE))
            setLoadingGroupsData(false)
            return
          } else {
            dispatch(setGroups(groups))
          }

          // If it's just a group info update (e.g. new recentMessage)
          if (groups.length === previousGroupsLength.current) {
            setLoadingGroupsData(false)
            return
          } else {
            previousGroupsLength.current = groups.length
          }

          const privateGroups = groups.filter(
            (group) => group.type === 'private'
          )

          if (privateGroups.length === 0) {
            dispatch(setPrivateGroupsUsers(PRIVATE_GROUPS_USERS_INIT_STATE))
            // Timeout keeps loadings consistent when no private groups
            setTimeout(() => setLoadingGroupsData(false), 300)
            return
          }

          if (privateGroups.length === previousPrivateGroupsLength.current) {
            setTimeout(() => setLoadingGroupsData(false), 300)
            return
          } else {
            previousPrivateGroupsLength.current = privateGroups.length
          }

          // Case private chat has been added or removed
          db.collection('users')
            .get()
            .then((snapshot) => {
              const users = snapshot.docs.map((doc) => convertDocToUser(doc))
              const privateGroupsUsers: User[] = []

              for (const group of privateGroups) {
                const otherMember = getOtherPrivateGroupMember(
                  group,
                  user.uid,
                  users
                )
                if (otherMember) {
                  privateGroupsUsers.push(otherMember)
                }
              }
              dispatch(setPrivateGroupsUsers(privateGroupsUsers))
              setLoadingGroupsData(false)
            })
        })
    } else {
      // Reset all in case user relogs during one session
      dispatch(setUser(USER_INIT_STATE))
      dispatch(setGroups(GROUPS_INIT_STATE))
      dispatch(setPrivateGroupsUsers(PRIVATE_GROUPS_USERS_INIT_STATE))
      setLoadingUserData(true)
      setLoadingGroupsData(true)
      previousGroupsLength.current = 0
    }

    return () => {
      unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <Box display="flex" height="100vh">
      {loadingUserAuth || (user && loadingUserData) ? (
        <Box m="auto">
          <CircularProgress size="150px" />
        </Box>
      ) : user && !loadingUserData ? (
        <Router>
          <Route exact path={['/', '/:groupID']}>
            <LoadingContext.Provider value={loadingGroupsData}>
              <Sidebar />
              <Chat />
            </LoadingContext.Provider>
          </Route>
        </Router>
      ) : (
        <Login />
      )}
    </Box>
  )
}

export default App
