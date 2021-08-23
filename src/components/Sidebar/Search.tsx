import { useState } from 'react'

import { Box, Input, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  search: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}))

const Search = () => {
  const classes = useStyles()
  const [input, setInput] = useState('')

  return (
    <Box className={classes.search} m={2}>
      <Input
        fullWidth
        disableUnderline
        placeholder="Search chat"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
    </Box>
  )
}

export default Search
