import firebase from 'firebase/app'
import logo from '../../assets/logo192.png'
import { auth, db, provider } from '../../firebase'
import GitHubIcon from '@material-ui/icons/GitHub'
import { Box, Button, Link, Typography } from '@material-ui/core'
import useStyles from './styles'

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
      {
        merge: true,
      }
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
        <Typography>
          Copyright © {new Date().getFullYear()} michalosman
        </Typography>
        <Box ml={1} className={classes.linkHover}>
          <Link
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
