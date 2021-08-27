import firebase from 'firebase/app'
import { useState } from 'react'

import { Box, IconButton, Input, makeStyles } from '@material-ui/core'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions'
import SendIcon from '@material-ui/icons/Send'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase'
import { useSelector } from 'react-redux'
import { AppState } from '../../state/store/store'

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    width: '100%',
  },

  input: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}))

const SendBox = () => {
  const classes = useStyles()
  const [input, setInput] = useState('')
  const { groupID } = useParams<{ groupID: string }>()
  const currentUser = useSelector((state: AppState) => state.user)

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (input === '') return

    db.collection('groupMessages').doc(groupID).collection('messages').add({
      text: input,
      sentBy: currentUser.uid,
      sentAt: firebase.firestore.FieldValue.serverTimestamp(),
    })

    setInput('')
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      p={1}
      border={1}
      borderRight={0}
      borderBottom={0}
      borderLeft={0}
      borderColor={'divider'}
    >
      <IconButton>
        <EmojiEmotionsIcon />
      </IconButton>
      <form className={classes.form} onSubmit={sendMessage}>
        <Input
          className={classes.input}
          fullWidth
          disableUnderline
          placeholder="Aa"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <IconButton type="submit">
          <SendIcon />
        </IconButton>
      </form>
    </Box>
  )
}

export default SendBox
