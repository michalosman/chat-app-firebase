import Box from '@material-ui/core/Box'
import Groups from './Groups'
import Search from './Search'
import UserPanel from './UserPanel'

const Sidebar = () => {
  return (
    <Box width="360px" borderRight={1} borderColor="grey.300">
      <UserPanel />
      <Search />
      <Groups />
    </Box>
  )
}

export default Sidebar
