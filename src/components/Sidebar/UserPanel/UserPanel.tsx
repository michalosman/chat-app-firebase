import { useSelector, useDispatch } from 'react-redux'
import { toggleDarkTheme } from '../../../state/actions'
import { AppState } from '../../../state/store/store'

import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core'
import Brightness2Icon from '@material-ui/icons/Brightness2'
import WbSunnyIcon from '@material-ui/icons/WbSunny'
import AddChatMenu from './AddChatMenu'
import OptionsMenu from './OptionsMenu'

const useStyles = makeStyles((theme) => ({
  userInfo: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },

  userActions: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      margin: 'auto',
    },
  },

  title: {
    marginLeft: theme.spacing(2),
    fontWeight: 700,
  },
}))

const UserPanel = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const currentUser = useSelector((state: AppState) => state.user)
  const darkThemeEnabled = useSelector(
    (state: AppState) => state.darkThemeEnabled
  )

  return (
    <Box display="flex" justifyContent="space-between" m={2} mb={1}>
      <Box className={classes.userInfo} display="flex" alignItems="center">
        {currentUser.photoURL ? (
          <Avatar src={`${currentUser.photoURL}`} />
        ) : (
          <CircularProgress size="40px" />
        )}
        <Typography className={classes.title} variant="h5">
          Chats
        </Typography>
      </Box>
      <Box className={classes.userActions} display="flex">
        <OptionsMenu />
        <AddChatMenu />
        {darkThemeEnabled ? (
          <IconButton onClick={() => dispatch(toggleDarkTheme())}>
            <WbSunnyIcon />
          </IconButton>
        ) : (
          <IconButton onClick={() => dispatch(toggleDarkTheme())}>
            <Brightness2Icon />
          </IconButton>
        )}
      </Box>
    </Box>
  )
}

export default UserPanel
