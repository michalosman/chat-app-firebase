# Chat App

Chat App created with React & Firebase.

[Live Demo](https://chat-app-mo.netlify.app/) :point_left:

### Features

- Google sign in
- Toggle dark / light theme
- Create and delete private chats
- Create, manage, leave and delete public chats
- Responsive design

## Screenshots

### Mobile

![mobile-dark](https://user-images.githubusercontent.com/40360401/151681357-fe49eb57-6f11-439e-a85a-18fb34adb023.png)

### Desktop

![desktop-dark](https://user-images.githubusercontent.com/40360401/151681199-a882d89b-8fc6-474f-ab53-f509abaf0715.png)

## Getting started

### Project setup

```
git clone https://github.com/michalosman/chat-app-firebase.git
cd chat-app-firebase
npm install
npm start
```

### Firebase setup

- Create a Firebase project
  - Go to [Firebase](https://firebase.google.com/) &rarr; Get Started &rarr; Add project
- Register your app
  - Go to Project overview &rarr; Choose </> (Web App)
- Enable Google Sign in
  - Go to Authentication &rarr; Get Started &rarr; Sign-in method &rarr; Enable Google
- Enable Firestore
  - Go to Firestore Database &rarr; Create database
- Setup project
  - Go to Project settings &rarr; General &rarr; Your apps &rarr; SDK setup and configuration &rarr; Config
  - Create a .env.local file in project's root directory
  - Paste code below and provide your keys found in Config

```
REACT_APP_API_KEY={apiKey}
REACT_APP_AUTH_DOMAIN={authDomain}
REACT_APP_PROJECT_ID={projectId}
REACT_APP_STORAGE_BUCKET={storageBucket}
REACT_APP_MESSAGING_SENDER_ID={senderId}
REACT_APP_APP_ID={appId}
```

## Built with

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Material-UI](https://material-ui.com/)
- [Firebase](https://firebase.google.com/)
- [react-firebase-hooks](https://github.com/CSFrequency/react-firebase-hooks)
