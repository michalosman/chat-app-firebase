import PrivateMenu from './PrivateMenu'
import GroupMenu from './GroupMenu'

import { Avatar, Box, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  bold: {
    fontWeight: 700,
  },
}))

const ChatPanel = () => {
  const classes = useStyles()
  const isPrivate = false

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px={2}
      py={1}
      border={1}
      borderTop={0}
      borderRight={0}
      borderLeft={0}
      borderColor={'divider'}
    >
      <Box display="flex" alignItems="center">
        <Avatar />
        <Box ml={2}>
          <Typography className={classes.bold}>User Name</Typography>
          <Typography variant="caption" color="textSecondary">
            Last message sent
          </Typography>
        </Box>
      </Box>
      {isPrivate ? <PrivateMenu /> : <GroupMenu />}
    </Box>
  )
}

export default ChatPanel
