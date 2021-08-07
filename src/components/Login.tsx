import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../firebase'
import logo from '../assets/logo192.png'

import { Box, Button, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.action.selected,
  },

  box: {
    backgroundColor: theme.palette.background.default,
  },

  title: {
    fontSize: '26px',
    fontWeight: 'bold',
  },

  imageShadow: {
    width: '100px',
    height: '71px',
    borderRadius: '10px',
  },

  image: {
    width: '100%',
    marginTop: '-14px',
  },
}))

const Login = () => {
  const classes = useStyles()

  const signInWithGoogle = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
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
        width="400px"
        height="400px"
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
          >
            Sign in with Google
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Login
