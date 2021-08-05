import { Box, makeStyles } from '@material-ui/core'
import db from '../../utils/db.json'

const useStyles = makeStyles((theme) => ({
  message: {
    position: 'relative',
    borderRadius: '10px',
    marginRight: 'auto',
    backgroundColor: theme.palette.action.selected,
  },

  ownMessage: {
    marginRight: '0',
    marginLeft: 'auto',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },

  messageInfo: {
    position: 'absolute',
    top: '-22px',
    left: '8px',
    color: theme.palette.text.primary,
  },
}))

const Messages = () => {
  const classes = useStyles()
  const groupMessages = db.groupMessages
  const userId = 'u1'
  const groupId = 'g1'
  const messages = groupMessages[0].messages

  return (
    <Box
      flex={1}
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
      p={2}
    >
      {messages.map((message) => (
        <Box
          className={`${classes.message} ${
            message.sentBy === userId ? classes.ownMessage : ''
          }`}
          p={1}
          mt={4}
        >
          <Box className={classes.messageInfo} display="flex">
            <div>{message.sentBy}</div>
            {/* <div>{message.sentAt}</div> */}
          </Box>
          <div>{message.text}</div>
        </Box>
      ))}
    </Box>
  )
}

export default Messages
