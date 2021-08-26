import { Box, CircularProgress, makeStyles } from '@material-ui/core'
import { AppState } from '../../../state/store/store'
import { useSelector } from 'react-redux'
import GroupBox from './GroupBox'
import { useParams } from 'react-router-dom'
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

  displayNone: {
    display: 'none',
  },

  loadingBox: {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2.5),
    },
  },
}))

const Groups = () => {
  const classes = useStyles()
  const groups = useSelector((state: AppState) => state.groups)
  const { groupID: activeGroupID } = useParams<{ groupID: string }>()
  const [loading, setLoading] = useState(true)
  console.log(loading)

  const groupBoxes = groups.map((group) => (
    <GroupBox
      key={group.id}
      group={group}
      isActive={activeGroupID === group.id}
      setLoading={setLoading}
    />
  ))

  return (
    <div>
      {loading ? (
        <Box
          className={classes.loadingBox}
          display="flex"
          justifyContent="center"
          mt={4}
        >
          <CircularProgress size="50px" />
        </Box>
      ) : (
        ''
      )}
      <Box
        className={`${classes.scrollBox} ${loading ? classes.displayNone : ''}`}
        display="flex"
        flexDirection="column"
        m={2}
        mr={1}
      >
        {groupBoxes}
      </Box>
    </div>
  )
}

export default Groups
