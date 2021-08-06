import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import db from '../../utils/db.json'
import { toggleDarkTheme } from '../../state/actions'
import { AppState } from '../../state/store/store'

import {
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core'

import AddIcon from '@material-ui/icons/Add'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import Brightness2Icon from '@material-ui/icons/Brightness2'
import WbSunnyIcon from '@material-ui/icons/WbSunny'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import ReportOutlinedIcon from '@material-ui/icons/ReportOutlined'
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined'
import PeopleOutlinedIcon from '@material-ui/icons/PeopleOutlined'

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(2),
    fontWeight: 700,
  },

  iconButton: {
    marginLeft: theme.spacing(1),
  },
}))

const UserPanel = () => {
  const darkThemeEnabled = useSelector(
    (state: AppState) => state.darkThemeEnabled
  )
  const dispatch = useDispatch()
  const classes = useStyles()
  const user = db.users[0]
  const [anchorElMore, setAnchorElMore] = useState<null | HTMLElement>(null)
  const [anchorElAdd, setAnchorElAdd] = useState<null | HTMLElement>(null)

  const openMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElMore(e.currentTarget)
  }

  const openAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElAdd(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorElMore(null)
    setAnchorElAdd(null)
  }

  const signOut = () => {
    handleClose()
  }

  return (
    <Box display="flex" justifyContent="space-between" m={2} mb={3}>
      <Box display="flex" alignItems="center">
        <Avatar src={`${user.photoURL}`} />
        <Typography className={classes.title} variant="h5">
          Chats
        </Typography>
      </Box>
      <Box display="flex">
        <IconButton className={classes.iconButton} onClick={openMore}>
          <MoreHorizIcon />
        </IconButton>
        <Menu
          anchorEl={anchorElMore}
          keepMounted
          open={Boolean(anchorElMore)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <SettingsOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Preferences" />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <HelpOutlineIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Help" />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <ReportOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Report an issue" />
          </MenuItem>
          <MenuItem onClick={signOut}>
            <ListItemIcon>
              <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </MenuItem>
        </Menu>
        <IconButton className={classes.iconButton} onClick={openAdd}>
          <AddIcon />
        </IconButton>
        <Menu
          anchorEl={anchorElAdd}
          keepMounted
          open={Boolean(anchorElAdd)}
          onClose={handleClose}
        >
          <MenuItem onClick={signOut}>
            <ListItemIcon>
              <PersonOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Private" />
          </MenuItem>
          <MenuItem onClick={signOut}>
            <ListItemIcon>
              <PeopleOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Group" />
          </MenuItem>
        </Menu>
        {darkThemeEnabled ? (
          <IconButton
            className={classes.iconButton}
            onClick={() => dispatch(toggleDarkTheme())}
          >
            <WbSunnyIcon />
          </IconButton>
        ) : (
          <IconButton
            className={classes.iconButton}
            onClick={() => dispatch(toggleDarkTheme())}
          >
            <Brightness2Icon />
          </IconButton>
        )}
      </Box>
    </Box>
  )
}

export default UserPanel
