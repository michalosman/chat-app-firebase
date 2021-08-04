import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import Brightness4Icon from '@material-ui/icons/Brightness4'

const useStyles = makeStyles((theme) => ({
  bold: {
    fontWeight: 700,
  },

  iconButton: {
    marginLeft: theme.spacing(1),
  },
}))

const UserPanel = () => {
  const classes = useStyles()

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      m={2}
    >
      <Box display="flex" alignItems="center" width="100%">
        <Avatar />
        <Box pl={'10px'}>
          <Typography className={classes.bold} variant="h5">
            Chats
          </Typography>
        </Box>
      </Box>
      <Box display="flex" alignItems="center">
        <IconButton className={classes.iconButton}>
          <MoreHorizIcon />
        </IconButton>
        <IconButton className={classes.iconButton}>
          <AddIcon />
        </IconButton>
        {true ? (
          <IconButton className={classes.iconButton}>
            <Brightness4Icon />
          </IconButton>
        ) : (
          <IconButton className={classes.iconButton}>
            <Brightness7Icon />
          </IconButton>
        )}
      </Box>
    </Box>
  )
}

export default UserPanel
