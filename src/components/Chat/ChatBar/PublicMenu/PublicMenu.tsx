import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import UserSearch from '../../../UserSearch/UserSearch'
import Chat from '../../../../types/Chat'
import InputBox from '../../../InputBox/InputBox'
import { AppState } from '../../../../store'
import { db } from '../../../../firebase'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import DeleteIcon from '@material-ui/icons/Delete'
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
} from '@material-ui/core'
import { convertDocToUser } from '../../../../utils'

interface Props {
  chat: Chat
  isOwner: boolean
}

const PublicMenu = ({ chat, isOwner }: Props) => {
  const user = useSelector((state: AppState) => state.user)
  const { chatID } = useParams<{ chatID: string }>()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isAddPersonDialogOpen, setIsAddPersonDialogOpen] = useState(false)
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false)
  const TEST_CHAT_ID = process.env.REACT_APP_TEST_CHAT_ID

  const openMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const closeMenu = () => {
    setAnchorEl(null)
  }

  const openAddPersonDialog = () => {
    setIsAddPersonDialogOpen(true)
    closeMenu()
  }

  const closeAddPersonDialog = () => {
    setIsAddPersonDialogOpen(false)
  }

  const openRenameDialog = () => {
    setIsRenameDialogOpen(true)
    closeMenu()
  }

  const closeRenameDialog = () => {
    setIsRenameDialogOpen(false)
  }

  const addPerson = async (id: string) => {
    if (chat.members.find((member) => member.uid === id)) return

    const newMember = await db.collection('users').doc(id).get()

    db.collection('chats')
      .doc(chatID)
      .set(
        {
          members: [...chat.members, convertDocToUser(newMember)],
        },
        { merge: true }
      )
  }

  const deleteChat = () => {
    if (!isOwner) return
    db.collection('chats').doc(chatID).delete()
  }

  const leaveChat = () => {
    if (chat.id === TEST_CHAT_ID) return

    db.collection('chats')
      .doc(chatID)
      .set(
        {
          members: chat.members.filter((member) => member.uid !== user.uid),
        },
        { merge: true }
      )
  }

  const renameChat = (newName: string) => {
    db.collection('chats').doc(chatID).set(
      {
        name: newName,
      },
      { merge: true }
    )
    closeRenameDialog()
  }

  return (
    <>
      <IconButton onClick={openMenu}>
        <MoreHorizIcon></MoreHorizIcon>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <MenuItem onClick={openAddPersonDialog}>
          <ListItemIcon>
            <AddIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Add person" />
        </MenuItem>
        {isOwner ? (
          <MenuItem onClick={openRenameDialog}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Rename" />
          </MenuItem>
        ) : (
          ''
        )}
        {isOwner ? (
          <MenuItem onClick={deleteChat}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </MenuItem>
        ) : (
          <MenuItem disabled={chat.id === TEST_CHAT_ID} onClick={leaveChat}>
            <ListItemIcon>
              <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={`Leave${
                chat.id === TEST_CHAT_ID ? ' (disabled in test chat)' : ''
              }`}
            />
          </MenuItem>
        )}
        <Dialog open={isAddPersonDialogOpen} onClose={closeAddPersonDialog}>
          <UserSearch
            onItemClick={addPerson}
            onCancel={closeAddPersonDialog}
            avoidIdList={chat.members.map((member) => member.uid)}
          />
        </Dialog>
        <Dialog open={isRenameDialogOpen} onClose={closeRenameDialog}>
          <InputBox
            onSubmit={renameChat}
            onCancel={closeRenameDialog}
            confirmBtnName={'Rename'}
            placeholder="New name"
          />
        </Dialog>
      </Menu>
    </>
  )
}

export default PublicMenu
