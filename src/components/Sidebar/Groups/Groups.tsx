import { useSelector } from 'react-redux'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import GroupBox from './GroupBox'
import { AppState } from '../../../state/store/store'
import { LoadingContext } from '../../../App'

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
  const loadingGroupsData = useContext(LoadingContext)
  const { groupID } = useParams<{ groupID: string }>()

  const groupBoxes = groups.map((group) => (
    <GroupBox key={group.id} group={group} isActive={groupID === group.id} />
  ))

  return (
    <Box
      className={classes.scrollBox}
      display="flex"
      flexDirection="column"
      m={2}
      mr={1}
      flex={1}
    >
      {loadingGroupsData ? (
        <Box display="flex" justifyContent="center" flex={1} mt={3}>
          <CircularProgress size="50px" />
        </Box>
      ) : (
        groupBoxes
      )}
    </Box>
  )
}

export default Groups
