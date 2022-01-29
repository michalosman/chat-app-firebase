import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import Chat from './components/Chat'
import Sidebar from './components/Sidebar'
import Login from './components/Login'
import Loading from './components/Loading'
import { auth, db } from './firebase'
import { convertDocToChat, convertDocToUser } from './utils'
import { USER_INIT_STATE } from './state/reducers/user'
import { CHATS_INIT_STATE } from './state/reducers/chats'
import { Box } from '@material-ui/core'
import { setChats, setUser } from './state/actions'

const App = () => {
  const dispatch = useDispatch()
  const [user, loading] = useAuthState(auth)
  const [fetchingUserData, setFetchingUserData] = useState(true)

  useEffect(() => {
    if (!user) {
      dispatch(setUser(USER_INIT_STATE))
      dispatch(setChats(CHATS_INIT_STATE))
      setFetchingUserData(true)
    }

    fetchUserData()
    const unsubscribe = subscribeChats()

    return () => {
      unsubscribe()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const fetchUserData = async () => {
    if (!user) return

    await db
      .collection('users')
      .doc(user.uid)
      .get()
      .then((snapshot) => {
        dispatch(setUser(convertDocToUser(snapshot)))
        setFetchingUserData(false)
      })
  }

  const subscribeChats = () => {
    if (!user) return () => {}

    return db
      .collection('chats')
      .where('members', 'array-contains', {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      })
      .onSnapshot((snapshot) => {
        const chats = snapshot.docs.map((doc) => convertDocToChat(doc))
        dispatch(setChats(chats))
      })
  }

  if (loading || (user && fetchingUserData)) return <Loading />
  if (!user) return <Login />

  return (
    <Box display="flex" height="100vh">
      <Router>
        <Route exact path={['/', '/:chatID']}>
          <Sidebar />
          <Chat />
        </Route>
      </Router>
    </Box>
  )
}

export default App
