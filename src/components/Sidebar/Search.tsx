import Box from '@material-ui/core/Box'
import Input from '@material-ui/core/Input'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  input: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    borderRadius: '50px',
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
