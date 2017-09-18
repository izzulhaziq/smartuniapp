import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, uiTheme } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: Metrics.baseMargin,
    paddingBottom: Metrics.baseMargin
  },
  cardHeader: {
    backgroundColor: uiTheme.palette.accentColor
  },
  row: {
    flex: 1,
    backgroundColor: Colors.bloodOrange,
    marginVertical: Metrics.smallMargin / 2,
    justifyContent: 'center',
    paddingTop: Metrics.smallMargin,
    paddingBottom: Metrics.smallMargin
  },
  boldLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.charcoal,
    textAlign: 'left',
    marginBottom: Metrics.smallMargin
  },
  label: {
    textAlign: 'left',
    color: Colors.charcoal
  },
  status: {
    flex: 1,
    alignSelf: 'flex-end',

    position: 'absolute',
    top: 25,
    right: 20,
    zIndex: 3
  },
  statusBackground: {
    flex: 1,
    alignSelf: 'flex-end',

    position: 'absolute',
    top: 20,
    right: 15,
    zIndex: 3
  }
})
