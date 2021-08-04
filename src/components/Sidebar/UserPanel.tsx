import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

const useStyles = makeStyles({
  bold: {
    fontWeight: 700,
  },

  iconButton: {
    // backgroundColor: '#f0f2f5',
  },
})

const UserPanel = () => {
  const classes = useStyles()

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      mx={'16px'}
      my={'20px'}
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
        <IconButton size="small" className={classes.iconButton}>
          <MoreHorizIcon />
        </IconButton>
        <IconButton size="small">
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default UserPanel
