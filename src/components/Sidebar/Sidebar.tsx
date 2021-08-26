import GroupsPanel from './Groups'
import Search from './Search'
import UserPanel from './UserPanel'

import { Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  sidebar: {
    [theme.breakpoints.down('sm')]: {
      width: '83px',
    },
  },
}))

const Sidebar = () => {
  const classes = useStyles()

  return (
    <Box
      className={classes.sidebar}
      display="flex"
      flexDirection="column"
      width="361px"
      border={1}
      borderTop={0}
      borderBottom={0}
      borderLeft={0}
      borderColor={'divider'}
    >
      <UserPanel />
      <Search />
      <GroupsPanel />
    </Box>
  )
}

export default Sidebar
