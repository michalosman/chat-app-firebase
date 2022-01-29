import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  button: {
    textTransform: 'none',
  },

  active: {
    backgroundColor: theme.palette.action.selected,
  },

  avatar: {
    width: '50px',
    height: '50px',
  },

  link: {
    textDecoration: 'none',
  },
}))