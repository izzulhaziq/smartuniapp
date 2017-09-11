import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes'

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
