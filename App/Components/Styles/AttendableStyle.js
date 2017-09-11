import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1
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
    alignSelf: 'center',
    color: Colors.charcoal,
    textAlign: 'left',
    marginBottom: Metrics.baseMargin
  },
  label: {
    textAlign: 'left',
    color: Colors.charcoal
  }
})
