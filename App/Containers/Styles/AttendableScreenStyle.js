import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, uiTheme } from '../../Themes'
import { COLOR } from 'react-native-material-ui'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.frost
  },
  boldLabel: {
    fontWeight: 'bold',
    color: Colors.charcoal,
    textAlign: 'left',
    marginBottom: Metrics.baseMargin
  },
  scheduleProgress: {
    textAlign: 'left',
    color: uiTheme.palette.secondaryTextColor,
    //marginTop: -Metrics.baseMargin
  },
  label: {
    textAlign: 'left',
    color: Colors.charcoal,
    marginTop: Metrics.baseMargin
  },
  status: {
    flex: 1,
    alignSelf: 'flex-end',

    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 2
  }
})

export const listItemStyles = StyleSheet.create({
  secondaryText: {
    lineHeight: 16,
    fontSize: 12,
    color: COLOR.cyan500
  },
  tertiaryText: {
    lineHeight: 16,
    fontSize: 12,
    color: COLOR.cyan500
  }
})
