import { useSelector } from 'react-redux'
import { Dispatch, SetStateAction, useContext } from 'react'
import { useParams } from 'react-router-dom'
import GroupBox from './GroupBox'
import Group from '../../../types/Group'
import { AppState } from '../../../state/store/store'
import { LoadingContext } from '../../../App'
import { getOtherPrivateGroupMember } from '../../../utils/utils'

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

interface Props {
  currentSearch: string
  setCurrentSearch: Dispatch<SetStateAction<string>>
}

const Groups = ({ currentSearch, setCurrentSearch }: Props) => {
  const classes = useStyles()
  const groups = useSelector((state: AppState) => state.groups)
  const currentUser = useSelector((state: AppState) => state.user)
  const privateGroupsUsers = useSelector(
    (state: AppState) => state.privateGroupsUsers
  )
  const loadingGroupsData = useContext(LoadingContext)
  const { groupID } = useParams<{ groupID: string }>()

  const filterGroups = (groups: Group[]) => {
    if (currentSearch === '') return groups
    if (currentSearch.includes('\\')) return []

    const regex = new RegExp(currentSearch, 'gi')
    return groups.filter((group) =>
      group.type === 'private'
        ? getOtherPrivateGroupMember(
            group,
            currentUser.uid,
            privateGroupsUsers
          )?.displayName.match(regex)
        : group.name.match(regex)
    )
  }

  const groupBoxes = filterGroups(groups).map((group) => (
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
