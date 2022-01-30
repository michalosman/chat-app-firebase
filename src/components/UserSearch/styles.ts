import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  input: {
    height: '38px',
    paddingRight: theme.spacing(1.5),
    paddingLeft: theme.spacing(1.5),
    marginBottom: theme.spacing(2),
    borderRadius: '4px',
  },

  list: {
    width: '105%',
    height: '121px',
    padding: '0',
    overflowY: 'scroll',
    overflowX: 'hidden',
  },

  li: {
    borderRadius: '4px',
    padding: theme.spacing(1),
  },

  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
}))
