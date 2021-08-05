import { Box, Input, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  input: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    borderRadius: '50px',
    backgroundColor: theme.palette.action.hover,
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
