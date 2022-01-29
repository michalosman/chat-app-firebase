import { Box, Input } from '@material-ui/core'
import { Dispatch, SetStateAction } from 'react'
import useStyles from './styles'

interface Props {
  search: string
  setSearch: Dispatch<SetStateAction<string>>
}

const ChatSearch = ({ search, setSearch }: Props) => {
  const classes = useStyles()

  return (
    <Box className={classes.search} m={2}>
      <Input
        fullWidth
        disableUnderline
        placeholder="Search chat"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
    </Box>
  )
}

export default ChatSearch
