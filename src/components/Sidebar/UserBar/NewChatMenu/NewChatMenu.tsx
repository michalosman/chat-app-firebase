import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import firebase from 'firebase/app'
import UserSearch from '../../../UserSearch/UserSearch'
import InputBox from '../../../InputBox/InputBox'
import { db } from '../../../../firebase'
import { AppState } from '../../../../store'
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
import {
  convertDocToUser,
  getOtherPrivateChatsMembers,
} from '../../../../utils'

const NewChatMenu = () => {
  const user = useSelector((state: AppState) => state.user)
  const chats = useSelector((state: AppState) => state.chats)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isPrivateDialogOpen, setIsPrivateDialogOpen] = useState(false)
  const [isPublicDialogOpen, setIsPublicDialogOpen] = useState(false)

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

  const openChatDialog = () => {
    closeMenu()
    setIsPublicDialogOpen(true)
  }

  const closeChatDialog = () => {
    setIsPublicDialogOpen(false)
  }

  const createPrivateChat = async (id: string) => {
    const otherMember = await db.collection('users').doc(id).get()

    db.collection('chats').add({
      name: '',
      type: 'private',
      members: [convertDocToUser(otherMember), user],
      createdBy: user.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      recentMessage: {
        text: 'Chat created',
        sentAt: firebase.firestore.FieldValue.serverTimestamp(),
        sentBy: {
          uid: user.uid,
          displayName: user.displayName,
        },
      },
    })
    closePrivateDialog()
  }

  const createPublicChat = (name: string) => {
    db.collection('chats').add({
      name: name,
      type: 'public',
      members: [user],
      createdBy: user.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      recentMessage: {
        text: 'Chat created',
        sentAt: firebase.firestore.FieldValue.serverTimestamp(),
        sentBy: {
          uid: user.uid,
          displayName: user.displayName,
        },
      },
    })
    closeChatDialog()
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
        <MenuItem onClick={openChatDialog}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Public" />
        </MenuItem>
      </Menu>
      <Dialog open={isPrivateDialogOpen} onClose={closePrivateDialog}>
        <UserSearch
          onItemClick={createPrivateChat}
          onCancel={closePrivateDialog}
          avoidIdList={getOtherPrivateChatsMembers(
            chats.filter((chat) => chat.type === 'private'),
            user.uid
          )}
        />
      </Dialog>
      <Dialog open={isPublicDialogOpen} onClose={closeChatDialog}>
        <InputBox
          onSubmit={createPublicChat}
          onCancel={closeChatDialog}
          confirmBtnName={'Create'}
          placeholder="Chat name"
        />
      </Dialog>
    </>
  )
}

export default NewChatMenu
