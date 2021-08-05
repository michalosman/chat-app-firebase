import { Box, IconButton, Input, makeStyles } from '@material-ui/core'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions'
import SendIcon from '@material-ui/icons/Send'
import { useState } from 'react'

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    width: '100%',
  },

  input: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    borderRadius: '50px',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    backgroundColor: theme.palette.action.hover,
  },
}))

const SendBox = () => {
  const classes = useStyles()
  const [input, setInput] = useState('')

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (input === '') return
    console.log('message ', input)
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
