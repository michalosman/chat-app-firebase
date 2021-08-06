import Groups from './Groups'
import Search from './Search'
import UserPanel from './UserPanel'

import { Box, IconButton, makeStyles } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'

const useStyles = makeStyles((theme) => ({
  sidebar: {
    [theme.breakpoints.down('sm')]: {
      width: '90px',

      '& $hideSm': {
        display: 'none',
      },

      '& $showSm': {
        display: 'block',
      },
    },
  },

  hideSm: {
    display: 'block',
  },

  showSm: {
    display: 'none',
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
      <div className={classes.hideSm}>
        <UserPanel />
        <Search />
      </div>
      <Box className={classes.showSm} display="flex" mx={'auto'} my={1}>
        <IconButton>
          <SettingsIcon />
        </IconButton>
      </Box>
      <Groups />
    </Box>
  )
}

export default Sidebar

// 700px -> 118px, hide UserPanel, hide Search, show Settings
