import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import GroupBox from './GroupBox'
import { AppState } from '../../../state/store/store'

import { Box, CircularProgress, makeStyles } from '@material-ui/core'

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
  const { groupID } = useParams<{ groupID: string }>()
  const [loading, setLoading] = useState(true)

  const groupBoxes = groups.map((group) => (
    <GroupBox
      key={group.id}
      group={group}
      isActive={groupID === group.id}
      setLoading={setLoading}
    />
  ))

  return (
    <>
      <Box
        display={loading ? 'flex' : 'none'}
        justifyContent="center"
        alignItems="center"
        flex={1}
      >
        <CircularProgress size="50px" />
      </Box>
      <Box
        className={classes.scrollBox}
        display={loading ? 'none' : 'flex'}
        flexDirection="column"
        m={2}
        mr={1}
      >
        {groupBoxes}
      </Box>
    </>
  )
}

export default Groups
