import { useState } from 'react'

import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  Box,
  Typography,
  Button,
  Input,
  makeStyles,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles(() => ({
  dialogTitle: {
    fontSize: '21px',
    fontWeight: 'bold',
  },
}))

const GroupMenu = () => {
  const classes = useStyles()
  const isOwner = true
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isAddPersonDialogOpen, setIsAddPersonDialogOpen] = useState(false)
  const [addPersonInput, setAddPersonInput] = useState('')

  const openMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const closeMenu = () => {
    setAnchorEl(null)
  }

  const openAddPersonDialog = () => {
    setIsAddPersonDialogOpen(true)
  }

  const closeAddPersonDialog = () => {
    setIsAddPersonDialogOpen(false)
    setAddPersonInput('')
  }

  const handleAddPersonInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddPersonInput(e.currentTarget.value)
  }

  const addPerson = () => {}

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
        <MenuItem onClick={closeMenu}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Rename" />
        </MenuItem>
        {isOwner ? (
          <MenuItem onClick={closeMenu}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </MenuItem>
        ) : (
          <MenuItem onClick={closeMenu}>
            <ListItemIcon>
              <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Leave" />
          </MenuItem>
        )}
        <Dialog open={isAddPersonDialogOpen} onClose={closeAddPersonDialog}>
          <Box p={2}>
            <Typography
              className={classes.dialogTitle}
              align="center"
              gutterBottom
            >
              Add Person
            </Typography>
            <Input
              placeholder="Search person"
              onChange={handleAddPersonInput}
              value={addPersonInput}
            />
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button
                color="secondary"
                variant="contained"
                onClick={closeAddPersonDialog}
              >
                Cancel
              </Button>
              <Button color="primary" variant="contained" onClick={addPerson}>
                Create
              </Button>
            </Box>
          </Box>
        </Dialog>
      </Menu>
    </>
  )
}

export default GroupMenu
