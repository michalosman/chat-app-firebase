import { useSelector, useDispatch } from 'react-redux'
import NewChat from './NewChat'
import Options from './Options'
import { toggleDarkTheme } from '../../../state/actions'
import { AppState } from '../../../state/store/store'
import Brightness2Icon from '@material-ui/icons/Brightness2'
import WbSunnyIcon from '@material-ui/icons/WbSunny'
import { Avatar, Box, IconButton, Typography } from '@material-ui/core'
import useStyles from './styles'

const UserPanel = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const user = useSelector((state: AppState) => state.user)
  const darkThemeEnabled = useSelector(
    (state: AppState) => state.darkThemeEnabled
  )

  return (
    <Box display="flex" justifyContent="space-between" m={2} mb={1}>
      <Box className={classes.userInfo} display="flex" alignItems="center">
        <Avatar src={`${user.photoURL}`} />
        <Typography className={classes.title} variant="h5">
          Chats
        </Typography>
      </Box>
      <Box className={classes.userActions} display="flex">
        <Options />
        <NewChat />
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
