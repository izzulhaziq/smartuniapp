import React, { Component } from "react";
import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation'
import HomeScreen from '../Containers/HomeScreen'
import LoginScreen from '../Containers/LoginScreen'
import SettingsScreen from '../Containers/SettingsScreen'
import AttendableScreen from '../Containers/AttendableScreen'
import AttendanceHistoryScreen from '../Containers/AttendanceHistoryScreen'
import ClassListScreen from '../Containers/ClassListScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import SideBar from '../Components/SideBar'

import styles from './Styles/NavigationStyles'
import { COLOR } from 'react-native-material-ui'
import { ApplicationStyles, Metrics, Colors, uiTheme } from '../Themes'

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
      backgroundColor: COLOR.blueGrey100
    },
    labelStyle: {
      color: uiTheme.palette.darkPrimaryColor
    },
    indicatorStyle: {
      backgroundColor: uiTheme.palette.darkPrimaryColor
    }
  }
})

const PrimaryNav = DrawerNavigator({
  Home: { screen: HomeScreen },
  Attendance: { screen: AttendanceTab },
  Classes: { screen: ClassListNav },
  Settings: { screen: SettingsScreen },
  Login: { screen: LoginNav }
}, {
  initialRouteName: 'Login',
  contentComponent: props => <SideBar {...props} />
})

export default PrimaryNav
