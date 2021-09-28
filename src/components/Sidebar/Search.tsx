import { Dispatch, SetStateAction } from 'react'

import { Box, Input, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  search: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}))

interface Props {
  currentSearch: string
  setCurrentSearch: Dispatch<SetStateAction<string>>
}

const Search = ({ currentSearch, setCurrentSearch }: Props) => {
  const classes = useStyles()

  return (
    <Box className={classes.search} m={2}>
      <Input
        fullWidth
        disableUnderline
        placeholder="Search chat"
        onChange={(e) => setCurrentSearch(e.target.value)}
        value={currentSearch}
      />
    </Box>
  )
}

export default Search
