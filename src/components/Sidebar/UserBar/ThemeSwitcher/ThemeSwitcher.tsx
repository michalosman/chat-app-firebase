import { toggleDarkTheme } from '../../../../actions'
import { AppState } from '../../../../store'
import Brightness2Icon from '@material-ui/icons/Brightness2'
import WbSunnyIcon from '@material-ui/icons/WbSunny'
import { IconButton } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'

const ThemeSwitcher = () => {
  const dispatch = useDispatch()
  const darkThemeEnabled = useSelector(
    (state: AppState) => state.darkThemeEnabled
  )

  if (darkThemeEnabled) {
    return (
      <IconButton onClick={() => dispatch(toggleDarkTheme())}>
        <WbSunnyIcon />
      </IconButton>
    )
  } else {
    return (
      <IconButton onClick={() => dispatch(toggleDarkTheme())}>
        <Brightness2Icon />
      </IconButton>
    )
  }
}

export default ThemeSwitcher
