import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import firebase from 'firebase/app'
import UserSearchbox from '../../utils/UserSearchbox'
import InputBox from '../../utils/InputBox'
import { db } from '../../../firebase'
import { AppState } from '../../../state/store/store'

import AddIcon from '@material-ui/icons/Add'
import PersonIcon from '@material-ui/icons/Person'
import PeopleIcon from '@material-ui/icons/People'
import {
  Dialog,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@material-ui/core'

const AddChatMenu = () => {
  const currentUser = useSelector((state: AppState) => state.user)
  const privateGroupsUsers = useSelector(
    (state: AppState) => state.privateGroupsUsers
  )
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isPrivateDialogOpen, setIsPrivateDialogOpen] = useState(false)
  const [isGroupDialogOpen, setIsGroupDialogOpen] = useState(false)

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
  }

  const createPrivateGroup = (id: string) => {
    if (privateGroupsUsers.find((user) => user.uid === id)) return

    db.collection('groups').add({
      name: '',
      type: 'private',
      members: [id, currentUser.uid],
      createdBy: {
        uid: currentUser.uid,
        displayName: currentUser.displayName,
      },
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    closePrivateDialog()
  }

  const createGroupChat = (name: string) => {
    db.collection('groups').add({
      name: name,
      type: 'public',
      members: [currentUser.uid],
      createdBy: {
        uid: currentUser.uid,
        displayName: currentUser.displayName,
      },
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
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
          avoidIdList={privateGroupsUsers.map((user) => user.uid)}
        />
      </Dialog>
      <Dialog open={isGroupDialogOpen} onClose={closeGroupDialog}>
        <InputBox
          onSubmit={createGroupChat}
          onCancel={closeGroupDialog}
          confirmBtnName={'Create'}
          placeholder="Group name"
        />
      </Dialog>
    </>
  )
}

export default AddChatMenu
