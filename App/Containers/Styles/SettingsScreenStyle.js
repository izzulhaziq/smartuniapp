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
    textAlign: 'center',
    marginBottom: Metrics.baseMargin
  },
  cardContainer: {
    flex: 1,
    paddingTop: Metrics.baseMargin
  }
})
