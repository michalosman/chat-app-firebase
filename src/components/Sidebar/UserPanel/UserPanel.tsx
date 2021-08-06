import { useSelector, useDispatch } from 'react-redux'
import db from '../../../utils/db.json'
import { toggleDarkTheme } from '../../../state/actions'
import { AppState } from '../../../state/store/store'

import {
  Avatar,
  Box,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core'
import Brightness2Icon from '@material-ui/icons/Brightness2'
import WbSunnyIcon from '@material-ui/icons/WbSunny'
import AddChatMenu from './AddChatMenu'
import OptionsMenu from './OptionsMenu'

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(2),
    fontWeight: 700,
  },
}))

const UserPanel = () => {
  const darkThemeEnabled = useSelector(
    (state: AppState) => state.darkThemeEnabled
  )
  const dispatch = useDispatch()
  const classes = useStyles()
  const user = db.users[0]

  return (
    <Box display="flex" justifyContent="space-between" m={2} mb={3}>
      <Box display="flex" alignItems="center">
        <Avatar src={`${user.photoURL}`} />
        <Typography className={classes.title} variant="h5">
          Chats
        </Typography>
      </Box>
      <Box display="flex">
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
