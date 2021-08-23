import React, { useState } from 'react'
import { db, auth } from '../../../firebase'

import {
  Dialog,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Box,
  Typography,
  Input,
  Button,
  makeStyles,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import PersonIcon from '@material-ui/icons/Person'
import PeopleIcon from '@material-ui/icons/People'
import UserSearchbox from '../../UserSearchbox'

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    fontSize: '21px',
    fontWeight: 'bold',
  },
}))

const AddChatMenu = () => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isPrivateDialogOpen, setIsPrivateDialogOpen] = useState(false)
  const [isGroupDialogOpen, setIsGroupDialogOpen] = useState(false)
  const [input, setInput] = useState('')

  const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const closeMenu = () => {
    setAnchorEl(null)
  }

  const openPrivateDialog = () => {
    closeMenu()
    setIsPrivateDialogOpen(true)
  }

  const closePrivateDialog = () => {
    setIsPrivateDialogOpen(false)
    setInput('')
  }

  const openGroupDialog = () => {
    closeMenu()
    setIsGroupDialogOpen(true)
  }

  const closeGroupDialog = () => {
    setIsGroupDialogOpen(false)
    setInput('')
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value)
    // Some search box with results
  }

  const createPrivateChat = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    closePrivateDialog()
  }

  const createGroupChat = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    db.collection('groups').add({
      name: input,
      ownerId: auth.currentUser?.uid,
      members: [auth.currentUser?.uid],
      type: 'group',
    })
    closeGroupDialog()
  }

  return (
    <>
      <IconButton onClick={openMenu}>
        <AddIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <MenuItem onClick={openPrivateDialog}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Private" />
        </MenuItem>
        <MenuItem onClick={openGroupDialog}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Group" />
        </MenuItem>
      </Menu>
      <Dialog open={isPrivateDialogOpen} onClose={closePrivateDialog}>
        <Box p={2}>
          <Typography
            className={classes.dialogTitle}
            align="center"
            gutterBottom
          >
            Create Private Chat
          </Typography>
          <form onSubmit={createPrivateChat}>
            <Input
              placeholder="Search person"
              onChange={handleInput}
              value={input}
              disableUnderline
              required
            />
            <UserSearchbox search={input} />
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button
                color="secondary"
                variant="contained"
                onClick={closePrivateDialog}
              >
                Cancel
              </Button>
              <Button color="primary" variant="contained" type="submit">
                Create
              </Button>
            </Box>
          </form>
        </Box>
      </Dialog>
      <Dialog open={isGroupDialogOpen} onClose={closeGroupDialog}>
        <Box p={2}>
          <Typography
            className={classes.dialogTitle}
            align="center"
            gutterBottom
          >
            Create Group Chat
          </Typography>
          <form onSubmit={createGroupChat}>
            <Input
              placeholder="Name"
              onChange={handleInput}
              value={input}
              disableUnderline
              required
            />
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button
                color="secondary"
                variant="contained"
                onClick={closeGroupDialog}
              >
                Cancel
              </Button>
              <Button color="primary" variant="contained" type="submit">
                Create
              </Button>
            </Box>
          </form>
        </Box>
      </Dialog>
    </>
  )
}

export default AddChatMenu
