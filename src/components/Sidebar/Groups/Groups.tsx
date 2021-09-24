import { useEffect, useState } from 'react'
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
  const { groupID } = useParams<{ groupID: string }>()
  const currentUser = useSelector((state: AppState) => state.user)
  const groups = useSelector((state: AppState) => state.groups)
  const privateGroupsUsers = useSelector(
    (state: AppState) => state.privateGroupsUsers
  )
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // simulate loading to ensure private users data is fetched
    setLoading(true)
    if (groups.find((group) => group.type === 'private')) {
      if (privateGroupsUsers.length > 0) {
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }, [groups, privateGroupsUsers])

  const groupBoxes = groups.map((group) => (
    <GroupBox
      key={group.id}
      group={group}
      isActive={groupID === group.id}
      otherMember={
        group.type === 'private'
          ? privateGroupsUsers.find(
              (user) =>
                user.uid ===
                group.members.filter(
                  (memberID) => memberID !== currentUser.uid
                )[0]
            )
          : undefined
      }
    />
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
      {loading ? (
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
