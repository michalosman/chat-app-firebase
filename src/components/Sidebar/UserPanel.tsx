import {
  Avatar,
  Box,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import Brightness4Icon from '@material-ui/icons/Brightness4'

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(1),
    fontWeight: 700,
  },

  iconButton: {
    marginLeft: theme.spacing(1),
  },
}))

const UserPanel = () => {
  const classes = useStyles()
  const darkTheme = false

  return (
    <Box display="flex" justifyContent="space-between" m={2}>
      <Box display="flex" alignItems="center">
        <Avatar />
        <Typography className={classes.title} variant="h5">
          Chats
        </Typography>
      </Box>
      <Box display="flex">
        <IconButton className={classes.iconButton}>
          <MoreHorizIcon />
        </IconButton>
        <IconButton className={classes.iconButton}>
          <AddIcon />
        </IconButton>
        {darkTheme ? (
          <IconButton className={classes.iconButton}>
            <Brightness7Icon />
          </IconButton>
        ) : (
          <IconButton className={classes.iconButton}>
            <Brightness4Icon />
          </IconButton>
        )}
      </Box>
    </Box>
  )
}

export default UserPanel
