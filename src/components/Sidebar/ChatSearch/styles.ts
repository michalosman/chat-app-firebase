import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  search: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}))
