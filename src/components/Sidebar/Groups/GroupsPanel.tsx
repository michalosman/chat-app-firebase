import { Box, makeStyles } from '@material-ui/core'
import { AppState } from '../../../state/store/store'
import { useSelector } from 'react-redux'
import GroupBox from './GroupBox'
import { useState } from 'react'

const useStyles = makeStyles((theme) => ({
  scrollBox: {
    overflowY: 'scroll',
    overflowX: 'hidden',

    [theme.breakpoints.down('sm')]: {
      margin: '0',
      marginTop: theme.spacing(1),
    },
  },
}))

const GroupsPanel = () => {
  const classes = useStyles()
  const groups = useSelector((state: AppState) => state.groups)
  const [activeGroupID, setActiveGroupID] = useState('')

  return (
    <Box
      className={classes.scrollBox}
      display="flex"
      flexDirection="column"
      m={2}
      mr={1}
    >
      {groups.map((group) => (
        <GroupBox
          key={group.id}
          group={group}
          isActive={activeGroupID === group.id}
          setActiveGroupID={setActiveGroupID}
        />
      ))}
    </Box>
  )
}

export default GroupsPanel
