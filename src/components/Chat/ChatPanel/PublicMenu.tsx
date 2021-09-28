import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import UserSearchbox from '../../utils/UserSearchbox'
import Group from '../../../types/Group'
import InputBox from '../../utils/InputBox'
import { AppState } from '../../../state/store/store'
import { db } from '../../../firebase'

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

interface Props {
  group: Group
  isOwner: boolean
}

const PublicMenu = ({ group, isOwner }: Props) => {
  const currentUser = useSelector((state: AppState) => state.user)
  const { groupID } = useParams<{ groupID: string }>()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isAddPersonDialogOpen, setIsAddPersonDialogOpen] = useState(false)
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false)

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

  const addPerson = (id: string) => {
    if (group.members.find((memberID) => memberID === id)) return

    db.collection('groups')
      .doc(groupID)
      .set(
        {
          members: [...group.members, id],
        },
        { merge: true }
      )
  }

  const deleteGroup = () => {
    if (!isOwner) return
    db.collection('groups').doc(groupID).delete()
  }

  const leaveGroup = () => {
    db.collection('groups')
      .doc(groupID)
      .set(
        {
          members: group.members.filter(
            (memberID) => memberID !== currentUser.uid
          ),
        },
        { merge: true }
      )
  }

  const renameGroup = (newName: string) => {
    db.collection('groups').doc(groupID).set(
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
          <MenuItem onClick={deleteGroup}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </MenuItem>
        ) : (
          <MenuItem onClick={leaveGroup}>
            <ListItemIcon>
              <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Leave" />
          </MenuItem>
        )}
        <Dialog open={isAddPersonDialogOpen} onClose={closeAddPersonDialog}>
          <UserSearchbox
            onItemClick={addPerson}
            onCancel={closeAddPersonDialog}
            avoidIdList={group.members}
          />
        </Dialog>
        <Dialog open={isRenameDialogOpen} onClose={closeRenameDialog}>
          <InputBox
            onSubmit={renameGroup}
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
