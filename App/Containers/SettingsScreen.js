import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View } from 'react-native'
import { connect } from 'react-redux'
import { Toolbar, Subheader } from 'react-native-material-ui'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SettingsScreenStyle'

class SettingsScreen extends Component {
  render () {
    return (
      <View style={styles.mainContainer}>
          <View>
            <Toolbar
              leftElement={'menu'}
              centerElement='Settings'
              rightElement=''
              isSearchActive={false}
              onLeftElementPress={() => this.props.navigation.navigate("DrawerOpen")}
            />
          </View>
        <ScrollView style={styles.container}>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
