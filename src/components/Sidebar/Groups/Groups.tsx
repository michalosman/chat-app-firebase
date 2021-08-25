import { Box, makeStyles } from '@material-ui/core'
import { AppState } from '../../../state/store/store'
import { useSelector } from 'react-redux'
import Group from './Group'
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

const Groups = () => {
  const classes = useStyles()
  const groups = useSelector((state: AppState) => state.groups)
  const [activeGroup, setActiveGroup] = useState('')

  return (
    <Box
      className={classes.scrollBox}
      display="flex"
      flexDirection="column"
      m={2}
      mr={1}
    >
      {groups.map((group) => (
        <Group
          key={group.id}
          group={group}
          isActive={activeGroup === group.id}
          setActiveGroup={setActiveGroup}
        />
      ))}
    </Box>
  )
}

export default Groups
