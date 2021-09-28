import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import UserSearchbox from '../../UserSearchbox'
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
  Input,
  Box,
  Button,
  makeStyles,
} from '@material-ui/core'
import Group from '../../../types/Group'

const useStyles = makeStyles((theme) => ({
  input: {
    borderRadius: '4px',
    height: '38px',
    paddingRight: theme.spacing(1.5),
    paddingLeft: theme.spacing(1.5),
  },
}))

interface Props {
  group: Group
  isOwner: boolean
}

const PublicMenu = ({ group, isOwner }: Props) => {
  const classes = useStyles()
  const currentUser = useSelector((state: AppState) => state.user)
  const { groupID } = useParams<{ groupID: string }>()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isAddPersonDialogOpen, setIsAddPersonDialogOpen] = useState(false)
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false)
  const [renameDialogInput, setRenameDialogInput] = useState('')

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

  const renameGroup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    db.collection('groups').doc(groupID).set(
      {
        name: renameDialogInput,
      },
      { merge: true }
    )
    closeRenameDialog()
  }

  const handleRenameDialogInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRenameDialogInput(e.currentTarget.value)
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
          <Box p={2}>
            <form onSubmit={renameGroup}>
              <Input
                className={classes.input}
                placeholder="New name"
                onChange={handleRenameDialogInput}
                value={renameDialogInput}
                disableUnderline
                required
              />
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={closeRenameDialog}
                >
                  Cancel
                </Button>
                <Button color="primary" variant="contained" type="submit">
                  Rename
                </Button>
              </Box>
            </form>
          </Box>
        </Dialog>
      </Menu>
    </>
  )
}

export default PublicMenu
