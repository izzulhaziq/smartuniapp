import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: Metrics.baseMargin,
    paddingBottom: Metrics.baseMargin
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
    color: Colors.charcoal,
    textAlign: 'left',
    marginBottom: Metrics.baseMargin
  },
  label: {
    textAlign: 'left',
    color: Colors.charcoal
  },
  status: {
    flex: 1,
    alignSelf: 'flex-end',

    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 2
  },
  statusBackground: {
    flex: 1,
    alignSelf: 'flex-end',

    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 2
  }
})
