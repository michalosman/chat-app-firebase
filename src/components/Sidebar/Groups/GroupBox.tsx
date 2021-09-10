import { Link } from 'react-router-dom'
import Group from '../../../types/Group'
import User from '../../../types/User'

import { Avatar, Box, Button, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
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

  link: {
    textDecoration: 'none',
  },
}))

interface Props {
  group: Group
  isActive: boolean
  otherMember: User | undefined
}

const GroupBox = ({ group, isActive, otherMember }: Props) => {
  const classes = useStyles()

  const formatMessage = (message: string) => {
    return message.length < 20 ? message : message.substr(0, 20) + '...'
  }

  return (
    <Link className={classes.link} to={`/${group.id}`}>
      <Button
        className={`${classes.button} ${isActive ? classes.active : ''}`}
        fullWidth
      >
        <Box display="flex" alignItems="center" width="100%" p={1}>
          <Avatar
            className={classes.avatar}
            src={
              group.type === 'private'
                ? `${otherMember?.photoURL}`
                : `https://avatars.dicebear.com/api/initials/${group.name}.svg
                `
            }
          />
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            ml={2}
          >
            <Typography align="left">
              {group.type === 'private' ? otherMember?.displayName : group.name}
            </Typography>
            <Typography variant="caption" color="textSecondary" align="left">
              {group.recentMessage
                ? `${formatMessage(group.recentMessage.text)}`
                : `${formatMessage(
                    group.createdBy.displayName
                  )} started a chat`}
            </Typography>
          </Box>
        </Box>
      </Button>
    </Link>
  )
}

export default GroupBox
