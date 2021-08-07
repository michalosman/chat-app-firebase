import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyAqJQ8YxhZAzzTZ47toLQYwfsn6uWdaJC4',
  authDomain: 'chat-app-480f6.firebaseapp.com',
  projectId: 'chat-app-480f6',
  storageBucket: 'chat-app-480f6.appspot.com',
  messagingSenderId: '354209705',
  appId: '1:354209705:web:b579a14f2723fcfce07eb8',
})

const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)

export { auth, db }
