import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    paddingTop: Metrics.baseMargin,
    paddingBottom: Metrics.baseMargin,
    paddingLeft: Metrics.baseMargin,
    paddingRight: Metrics.baseMargin
  }
})
