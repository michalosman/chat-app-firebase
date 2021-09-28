import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Group from '../../../types/Group'
import { AppState } from '../../../state/store/store'
import {
  cutText,
  formatDate,
  getOtherPrivateGroupMember,
} from '../../../utils/utils'

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
}

const GroupBox = ({ group, isActive }: Props) => {
  const classes = useStyles()
  const currentUser = useSelector((state: AppState) => state.user)
  const privateGroupsUsers = useSelector(
    (state: AppState) => state.privateGroupsUsers
  )
  const otherMember = getOtherPrivateGroupMember(
    group,
    currentUser.uid,
    privateGroupsUsers
  )

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
          <Box display="flex" flexDirection="column" ml={2} width="100%">
            <Typography align="left">
              {group.type === 'private'
                ? otherMember
                  ? cutText(otherMember.displayName, 17)
                  : ''
                : cutText(group.name, 14)}
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="caption" color="textSecondary">
                {group.recentMessage
                  ? `${cutText(group.recentMessage.text, 10)}`
                  : `${cutText(
                      group.createdBy.displayName,
                      10
                    )} started a chat`}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {`${
                  group.recentMessage
                    ? formatDate(group.recentMessage.sentAt)
                    : formatDate(group.createdAt)
                }`}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Button>
    </Link>
  )
}

export default GroupBox
