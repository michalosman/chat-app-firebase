import { makeStyles, Typography } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import db from '../../utils/db.json'

const useStyles = makeStyles(() => ({
  avatar: {
    height: '50px',
    width: '50px',
  },

  scrollBox: {
    overflowY: 'scroll',
  },
}))

const Groups = () => {
  const classes = useStyles()
  const groups = db.groups

  return (
    <Box
      className={classes.scrollBox}
      display="flex"
      flexDirection="column"
      m={2}
    >
      {groups.map((group) => (
        <Button key={group.id}>
          <Box display="flex" width="100%" p={1}>
            <Avatar className={classes.avatar} />
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
