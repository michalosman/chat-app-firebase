import React, { useState } from 'react'
import { auth } from '../../../../firebase'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import SettingsIcon from '@material-ui/icons/Settings'
import HelpIcon from '@material-ui/icons/Help'
import ReportIcon from '@material-ui/icons/Report'
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const OptionsMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  let history = useHistory()

  const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const logout = () => {
    auth.signOut()
    history.push('/')
  }

  return (
    <>
      <IconButton onClick={openMenu}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem disabled onClick={handleClose}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Preferences" />
        </MenuItem>
        <MenuItem disabled onClick={handleClose}>
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary="Help" />
        </MenuItem>
        <MenuItem disabled onClick={handleClose}>
          <ListItemIcon>
            <ReportIcon />
          </ListItemIcon>
          <ListItemText primary="Report an issue" />
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </>
  )
}

export default OptionsMenu
