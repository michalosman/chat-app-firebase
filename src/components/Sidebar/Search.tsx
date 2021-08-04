import Box from '@material-ui/core/Box'
import Input from '@material-ui/core/Input'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  input: {
    borderRadius: '50px',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
}))

const Search = () => {
  const classes = useStyles()

  return (
    <Box m={2}>
      <Input
        className={classes.input}
        fullWidth
        disableUnderline
        placeholder="Search chat"
      />
    </Box>
  )
}

export default Search
