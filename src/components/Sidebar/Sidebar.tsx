import { Box } from '@material-ui/core'
import Groups from './Groups'
import Search from './Search'
import UserPanel from './UserPanel'

const Sidebar = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      width="360px"
      border={1}
      borderTop={0}
      borderBottom={0}
      borderLeft={0}
      borderColor={'divider'}
    >
      <UserPanel />
      <Search />
      <Groups />
    </Box>
  )
}

export default Sidebar
