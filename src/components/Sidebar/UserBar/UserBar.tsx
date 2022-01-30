import { useSelector } from 'react-redux'
import NewChatMenu from './NewChatMenu'
import OptionsMenu from './OptionsMenu'
import { AppState } from '../../../store'
import { Avatar, Box, Typography } from '@material-ui/core'
import useStyles from './styles'
import ThemeSwitcher from './ThemeSwitcher'

const UserBar = () => {
  const classes = useStyles()
  const user = useSelector((state: AppState) => state.user)

  return (
    <Box display="flex" justifyContent="space-between" m={2} mb={1}>
      <Box className={classes.userInfo} display="flex" alignItems="center">
        <Avatar src={`${user.photoURL}`} />
        <Typography className={classes.title} variant="h5">
          Chats
        </Typography>
      </Box>
      <Box className={classes.userActions} display="flex">
        <OptionsMenu />
        <NewChatMenu />
        <ThemeSwitcher />
      </Box>
    </Box>
  )
}

export default UserBar
