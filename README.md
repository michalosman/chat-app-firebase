# Chat App

[Live Demo](https://michalosman.github.io/chat-app/) :point_left:

## Getting started

### Project setup

```
git clone https://github.com/michalosman/chat-app.git
cd chat-app
npm install
npm start
```

### Firebase setup

- Create a Firebase project
  - Go to [Firebase](https://firebase.google.com/) &rarr; Get Started &rarr; Add project
- Register your app
  - Go to Project overview &rarr; Web App </>
- Enable Google Sign in
  - Go to Authentication &rarr; Get Started &rarr; Sign-in method &rarr; Enable Google
- Enable Firestore
  - Go to Firestore Database &rarr; Get Started
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

### Deployment (TODO)

- Set up security rules (Firestore Database)
- Remove localhost from Authorized domains (Authentication)
- Hosting

## Built with

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Firebase](https://firebase.google.com/)
- [Material-UI](https://material-ui.com/)
- [react-firebase-hooks](https://github.com/CSFrequency/react-firebase-hooks)
