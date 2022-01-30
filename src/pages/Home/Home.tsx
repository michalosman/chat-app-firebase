import { BrowserRouter as Router, Route } from 'react-router-dom'
import Chat from '../../components/Chat'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Box } from '@material-ui/core'

const Home = () => {
  return (
    <Box display="flex" height="100vh">
      <Router>
        <Route exact path={['/', '/:chatID']}>
          <Sidebar />
          <Chat />
        </Route>
      </Router>
    </Box>
  )
}

export default Home
