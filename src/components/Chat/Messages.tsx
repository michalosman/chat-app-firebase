import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase'
import Message from '../../types/Message'
import { AppState } from '../../state/store/store'
import { convertDocToMessage } from '../../utils/converters'

import { Box, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
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
    backgroundColor: theme.palette.primary.light,
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

const Messages = () => {
  const classes = useStyles()
  const currentUser = useSelector((state: AppState) => state.user)
  const { groupID } = useParams<{ groupID: string }>()
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    const unsubscribe = db
      .collection('groupMessages')
      .doc(groupID)
      .collection('messages')
      .orderBy('sentAt', 'desc')
      .onSnapshot((snapshot) => {
        const messages = snapshot.docs.map((doc) => convertDocToMessage(doc))
        setMessages(messages)
      })

    return () => {
      unsubscribe()
    }
  }, [groupID])

  return (
    <Box
      flex={1}
      className={classes.scrollBox}
      display="flex"
      flexDirection="column-reverse"
      p={2}
      pr={1}
    >
      {messages.map((message) => (
        <Box
          key={message.id}
          className={`${classes.message} ${
            message.sentBy === currentUser.uid ? classes.ownMessage : ''
          }`}
          p={1}
          mt={4}
        >
          <Typography className={classes.messageInfo} variant="caption">
            {message.sentBy === currentUser.uid
              ? 'You'
              : 'otheruser.displayname'}
          </Typography>
          <Typography className={classes.messageText}>
            {message.text}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

export default Messages
