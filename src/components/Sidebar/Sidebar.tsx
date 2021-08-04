import Box from '@material-ui/core/Box'
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
      borderColor="rgba(0, 0, 0, 0.1)"
    >
      <UserPanel />
      <Search />
      <Groups />
    </Box>
  )
}

export default Sidebar
