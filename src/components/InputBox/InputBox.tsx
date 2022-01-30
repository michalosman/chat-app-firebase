import { useState } from 'react'
import { Box, Button, Input } from '@material-ui/core'
import useStyles from './styles'

interface Props {
  onSubmit: (input: string) => void
  onCancel: () => void
  confirmBtnName: string
  placeholder: string
}

const InputBox = ({
  onSubmit,
  onCancel,
  confirmBtnName,
  placeholder,
}: Props) => {
  const classes = useStyles()
  const [input, setInput] = useState('')

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value)
  }

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(input)
  }

  return (
    <Box p={2}>
      <form onSubmit={submitForm}>
        <Input
          className={classes.input}
          placeholder={placeholder}
          onChange={handleInput}
          value={input}
          disableUnderline
          required
          autoFocus
        />
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button color="secondary" variant="contained" onClick={onCancel}>
            Cancel
          </Button>
          <Button color="primary" variant="contained" type="submit">
            {confirmBtnName}
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default InputBox
