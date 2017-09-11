import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import ClassListScreen from './ClassListScreen.js'
import { Toolbar } from 'react-native-material-ui'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View>
            <Toolbar
              leftElement='menu'
              centerElement='Classes'
              rightElement=''
              isSearchActive={false}
            />
          </View>
          <ClassListScreen />
        </ScrollView>
      </View>
    )
  }
}
