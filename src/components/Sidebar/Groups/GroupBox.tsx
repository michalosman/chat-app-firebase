import { Avatar, Box, Button, Typography, makeStyles } from '@material-ui/core'
import Group from '../../../types/Group'

interface Props {
  group: Group
  isActive: boolean
  setActiveGroup: (id: string) => void
}

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
}))

const GroupBox = ({ group, isActive, setActiveGroup }: Props) => {
  const classes = useStyles()

  return (
    <div>
      <Button
        className={`${classes.button} ${isActive ? classes.active : ''}`}
        onClick={() => setActiveGroup(group.id)}
      >
        <Box display="flex" alignItems="center" width="100%" p={1}>
          <Avatar
            className={classes.avatar}
            src={
              group.type === 'public'
                ? `https://avatars.dicebear.com/api/initials/${group.name}.svg
  `
                : `https://avatars.dicebear.com/api/initials/${group.name}.svg`
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
              {group?.recentMessage?.text}
            </Typography>
          </Box>
        </Box>
      </Button>
    </div>
  )
}

export default GroupBox
