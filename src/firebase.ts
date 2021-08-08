import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const app = firebase.initializeApp({
  apiKey: 'AIzaSyAqJQ8YxhZAzzTZ47toLQYwfsn6uWdaJC4',
  authDomain: 'chat-app-480f6.firebaseapp.com',
  projectId: 'chat-app-480f6',
  storageBucket: 'chat-app-480f6.appspot.com',
  messagingSenderId: '354209705',
  appId: '1:354209705:web:b579a14f2723fcfce07eb8',
})

const auth = app.auth()
const db = app.firestore()
const provider = new firebase.auth.GoogleAuthProvider()

export type User = firebase.User | null
export { auth, db, provider }
