import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  userInfo: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },

  userActions: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      margin: 'auto',
    },
  },

  title: {
    marginLeft: theme.spacing(2),
    fontWeight: 700,
  },
}))
