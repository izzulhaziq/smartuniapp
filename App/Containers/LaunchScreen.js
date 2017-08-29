import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import ClassListScreen from './ClassListScreen.js'

import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.section} >
            <Text style={styles.titleText}>
              Classes
            </Text>
          </View>
          <ClassListScreen />
        </ScrollView>
      </View>
    )
  }
}
