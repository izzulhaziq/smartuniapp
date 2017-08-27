import { StackNavigator } from 'react-navigation'
import AttendanceHistoryScreen from '../Containers/AttendanceHistoryScreen'
import ClassListScreen from '../Containers/ClassListScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  AttendanceHistoryScreen: { screen: AttendanceHistoryScreen },
  ClassListScreen: { screen: ClassListScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
