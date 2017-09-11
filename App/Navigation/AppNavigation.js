import React, { Component } from "react";
import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation'
import LoginScreen from '../Containers/LoginScreen'
import SettingsScreen from '../Containers/SettingsScreen'
import AttendableScreen from '../Containers/AttendableScreen'
import AttendanceHistoryScreen from '../Containers/AttendanceHistoryScreen'
import ClassListScreen from '../Containers/ClassListScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import SideBar from '../Components/SideBar'

import styles from './Styles/NavigationStyles'
import { COLOR } from 'react-native-material-ui'

// Manifest of possible screens
const ClassListNav = StackNavigator({
  Classes: { screen: ClassListScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Classes',
  navigationOptions: {
    headerStyle: styles.header
  }
})

const LoginNav = StackNavigator({
  Login: { screen: LoginScreen } 
}, {
  initialRouteName: 'Login'
})

const AttendanceTab = TabNavigator({
  AttendableScreen: { screen: AttendableScreen },
  AttendanceHistory: { screen: AttendanceHistoryScreen }
}, {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    style: {
      backgroundColor: COLOR.blueGrey900,
    }
  }
})

const PrimaryNav = DrawerNavigator({
  Attendance: { screen: AttendanceTab },
  Classes: { screen: ClassListNav },
  Settings: { screen: SettingsScreen },
  Login: { screen: LoginNav }
}, {
  initialRouteName: 'Login',
  contentComponent: props => <SideBar {...props} />
})

export default PrimaryNav
