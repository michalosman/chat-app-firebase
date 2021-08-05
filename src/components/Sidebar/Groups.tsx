import { Avatar, Box, Button, Typography, makeStyles } from '@material-ui/core'
import db from '../../utils/db.json'

const useStyles = makeStyles((theme) => ({
  scrollBox: {
    overflowY: 'scroll',
  },

  button: {
    textTransform: 'none',
  },

  active: {
    backgroundColor: theme.palette.action.selected,
  },

  avatar: {
    width: '50px',
    height: '50px',
  },
}))

const Groups = () => {
  const classes = useStyles()
  const groups = db.groups
  const activeGroup = db.groups[0]
  const privateReceiver = db.users[1]

  return (
    <Box
      className={classes.scrollBox}
      display="flex"
      flexDirection="column"
      m={2}
      mr={1}
    >
      {groups.map((group) => (
        <Button
          key={group.id}
          className={`${classes.button} ${
            group.id === activeGroup.id ? classes.active : ''
          }`}
        >
          <Box display="flex" width="100%" p={1}>
            <Avatar
              className={classes.avatar}
              src={
                group.type === 'public'
                  ? `https://avatars.dicebear.com/api/initials/${group.name}.svg
  `
                  : privateReceiver.photoURL
              }
            />
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              ml={2}
            >
              <Typography>{group.name}</Typography>
              <Typography variant="caption" color="textSecondary" align="left">
                {group.recentMessage.text}
              </Typography>
            </Box>
          </Box>
        </Button>
      ))}
    </Box>
  )
}

export default Groups
