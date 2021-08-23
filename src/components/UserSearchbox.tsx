import { Input, List, ListItem, makeStyles } from '@material-ui/core'
import { Dispatch, SetStateAction, useState } from 'react'

interface Props {
  setSelectedUserID: Dispatch<SetStateAction<string>>
}

const useStyles = makeStyles((theme) => ({
  input: {
    height: '38px',
    paddingRight: theme.spacing(1.5),
    paddingLeft: theme.spacing(1.5),
    borderRadius: '4px',
  },

  list: {
    width: '100%',
    maxHeight: '125px',
    padding: '0',
    borderRadius: '4px',
    overflow: 'scroll',
  },
}))

const UserSearchbox = ({ setSelectedUserID }: Props) => {
  const classes = useStyles()
  const [input, setInput] = useState('')

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value)
  }

  return (
    <div>
      <Input
        className={classes.input}
        placeholder="Search person"
        onChange={handleInput}
        value={input}
        disableUnderline
        required
      />
      {input ? (
        <List className={classes.list}>
          <ListItem button>1</ListItem>
          <ListItem button>2</ListItem>
          <ListItem button>2</ListItem>
          <ListItem button>2</ListItem>
          <ListItem button>2</ListItem>
        </List>
      ) : (
        ''
      )}
    </div>
  )
}

export default UserSearchbox
