import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../../../firebase'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import BlockIcon from '@material-ui/icons/Block'
import DeleteIcon from '@material-ui/icons/Delete'
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'

const PrivateMenu = () => {
  const { chatID } = useParams<{ chatID: string }>()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const openMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const deleteChat = () => {
    db.collection('chats').doc(chatID).delete()
    closeMenu()
  }

  const closeMenu = () => {
    setAnchorEl(null)
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
        <MenuItem disabled onClick={closeMenu}>
          <ListItemIcon>
            <BlockIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Block" />
        </MenuItem>
        <MenuItem onClick={deleteChat}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>
    </>
  )
}

export default PrivateMenu
