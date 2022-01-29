import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  scrollBox: {
    overflowY: 'scroll',
  },

  message: {
    position: 'relative',
    borderRadius: '10px',
    marginRight: 'auto',
    maxWidth: '50vw',
    backgroundColor: theme.palette.action.selected,
  },

  ownMessage: {
    marginRight: '0',
    marginLeft: 'auto',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '& $messageInfo': {
      right: '5px',
      left: 'auto',
    },
  },

  messageInfo: {
    position: 'absolute',
    top: '-20px',
    left: '5px',
    color: theme.palette.text.secondary,
    fontWeight: 'bold',
  },

  messageText: {
    whiteSpace: 'initial',
    wordWrap: 'break-word',
  },
}))
