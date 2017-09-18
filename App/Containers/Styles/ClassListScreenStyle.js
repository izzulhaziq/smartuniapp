import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.frost
  },
  row: {
    flex: 1,
    backgroundColor: Colors.fire,
    marginVertical: Metrics.smallMargin,
    justifyContent: 'center',
    paddingTop: Metrics.baseMargin,
    paddingBottom: Metrics.baseMargin
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  label: {
    textAlign: 'center',
    color: Colors.snow
  },
  listContent: {
    marginTop: Metrics.baseMargin
  }, 
  status: {
    flex: 1,
    alignSelf: 'flex-start',

    position: 'absolute',
    top: 25,
    left: 20,
    zIndex: 3
  },
  statusBackground: {
    flex: 1,
    alignSelf: 'flex-start',

    position: 'absolute',
    top: 20,
    left: 15,
    zIndex: 3
  }
})
