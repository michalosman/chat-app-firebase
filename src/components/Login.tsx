import firebase from 'firebase/app'
import logo from '../assets/logo192.png'
import { auth, db, provider } from '../firebase'

import GitHubIcon from '@material-ui/icons/GitHub'
import { Box, Button, Link, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.default,
  },

  box: {
    backgroundColor: theme.palette.action.hover,
  },

  title: {
    fontSize: '26px',
    fontWeight: 'bold',
  },

  imageShadow: {
    width: '120px',
    height: '86px',
    borderRadius: '13px',
  },

  image: {
    width: '100%',
    marginTop: '-16px',
  },

  footer: {
    position: 'absolute',
    bottom: '0',
    left: '0',
  },

  link: {
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}))

const Login = () => {
  const classes = useStyles()

  const signInWithGoogle = async () => {
    const { user } = await auth.signInWithPopup(provider)
    if (user) saveUserData(user)
  }

  const saveUserData = (user: firebase.User) => {
    db.collection('users').doc(user.uid).set(
      {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      },
      { merge: true }
    )
  }

  return (
    <Box
      className={classes.container}
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100vw"
      height="100vh"
      p={2}
    >
      <Box
        className={classes.box}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={5}
        borderRadius="10px"
        boxShadow={5}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
          maxWidth="400px"
          height="250px"
        >
          <Box className={classes.imageShadow} boxShadow={2}>
            <img className={classes.image} src={logo} alt="" />
          </Box>
          <Typography className={classes.title}>Welcome to ChatApp</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={signInWithGoogle}
            fullWidth
          >
            Sign in with Google
          </Button>
        </Box>
      </Box>
      <Box
        className={classes.footer}
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        py={1}
      >
        <Typography variant="h6">Copyright © 2021 michalosman</Typography>
        <Box ml={1}>
          <Link
            className={classes.link}
            color="textPrimary"
            href="https://github.com/michalosman"
            target="_blank"
          >
            <GitHubIcon />
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default Login
