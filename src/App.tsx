import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'
import Login from './pages/Login'
import Loading from './pages/Loading'
import { auth, db } from './firebase'
import { convertDocToChat, convertDocToUser } from './utils'
import { USER_INIT_STATE } from './reducers/user'
import { CHATS_INIT_STATE } from './reducers/chats'
import { setChats, setUser } from './actions'
import Home from './pages/Home'

const App = () => {
  const dispatch = useDispatch()
  const [user, loading] = useAuthState(auth)
  const [fetchingUserData, setFetchingUserData] = useState(true)
  const [fetchingChatsData, setFetchingChatsData] = useState(true)

  useEffect(() => {
    if (!user) {
      dispatch(setUser(USER_INIT_STATE))
      dispatch(setChats(CHATS_INIT_STATE))
      setFetchingUserData(true)
      setFetchingChatsData(true)
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
        setFetchingUserData(false)
        if (!snapshot.data()) return
        dispatch(setUser(convertDocToUser(snapshot)))
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
        setFetchingChatsData(false)
      })
  }

  if (loading || (user && (fetchingUserData || fetchingChatsData)))
    return <Loading />

  if (!user) return <Login />
  return <Home />
}

export default App
