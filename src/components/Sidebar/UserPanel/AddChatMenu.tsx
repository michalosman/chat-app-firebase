import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import UserSearchbox from '../../UserSearchbox'
import { db } from '../../../firebase'
import { AppState } from '../../../state/store/store'

import {
  Dialog,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Box,
  Input,
  Button,
  makeStyles,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import PersonIcon from '@material-ui/icons/Person'
import PeopleIcon from '@material-ui/icons/People'

const useStyles = makeStyles((theme) => ({
  input: {
    borderRadius: '4px',
    height: '38px',
    paddingRight: theme.spacing(1.5),
    paddingLeft: theme.spacing(1.5),
  },
}))

const AddChatMenu = () => {
  const classes = useStyles()
  const user = useSelector((state: AppState) => state.user)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isPrivateDialogOpen, setIsPrivateDialogOpen] = useState(false)
  const [isGroupDialogOpen, setIsGroupDialogOpen] = useState(false)
  const [groupDialogInput, setGroupDialogInput] = useState('')
  const privateGroupsUsers = useSelector(
    (state: AppState) => state.privateGroupsUsers
  )

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
  }

  const openGroupDialog = () => {
    closeMenu()
    setIsGroupDialogOpen(true)
  }

  const closeGroupDialog = () => {
    setIsGroupDialogOpen(false)
    setGroupDialogInput('')
  }

  const handleGroupDialogInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupDialogInput(e.currentTarget.value)
  }

  const createPrivateGroup = (id: string) => {
    if (privateGroupsUsers.find((user) => user.uid === id)) return

    db.collection('groups').add({
      name: '',
      type: 'private',
      members: [id, user.uid],
      createdBy: {
        uid: user.uid,
        displayName: user.displayName,
      },
    })
    closePrivateDialog()
  }

  const createGroupChat = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    db.collection('groups').add({
      name: groupDialogInput,
      type: 'public',
      members: [user.uid],
      createdBy: {
        uid: user.uid,
        displayName: user.displayName,
      },
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
        <UserSearchbox
          onItemClick={createPrivateGroup}
          onCancel={closePrivateDialog}
          avoidUsersList={privateGroupsUsers}
        />
      </Dialog>
      <Dialog open={isGroupDialogOpen} onClose={closeGroupDialog}>
        <Box p={2}>
          <form onSubmit={createGroupChat}>
            <Input
              className={classes.input}
              placeholder="Group name"
              onChange={handleGroupDialogInput}
              value={groupDialogInput}
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
