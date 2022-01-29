import { Box, CircularProgress } from '@material-ui/core'

const Loading = () => {
  return (
    <Box display="flex" height="100vh">
      <Box m="auto">
        <CircularProgress size="150px" />
      </Box>
    </Box>
  )
}

export default Loading
