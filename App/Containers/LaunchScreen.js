import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import DevscreensButton from '../../ignite/DevScreens/DevscreensButton.js'
import ClassListScreen from './ClassListScreen.js'

import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>

          <View style={styles.section} >
            <Text style={styles.titleText}>
              Hello Izzul!
            </Text>
            <Text style={styles.sectionText}>
              Your classes for today
            </Text>
          </View>

          <ClassListScreen />
        </ScrollView>
      </View>
    )
  }
}
