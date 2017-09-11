import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View } from 'react-native'
import { connect } from 'react-redux'
import { Toolbar, Subheader, ListItem, Card, Divider, Icon, Button, Avatar } from 'react-native-material-ui'
import LoginActions from '../Redux/LoginRedux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SettingsScreenStyle'

class SettingsScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoggingOut: null
    }

    this.logout = this.logout.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    console.log('nextprops', nextProps)
    if (!nextProps.hasLoggedIn) {
      this.props.navigation.navigate('Login')
    }

    this.setState({
      isLoggingOut: nextProps.isLoggingOut
    })
  }

  logout () {
    this.props.logout();
  }

  render () {
    const buttonText = this.state.isLoggingOut ? 'Signing out...' : 'Sign Out'
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
          <View>
            <Subheader text={'Account'} />
            <Card fullWidth>
                <Text style={styles.boldLabel}>{ this.props.username }</Text>
                <Divider />
                <View style={styles.cardContainer}>
                  <Button accent raised text={buttonText} onPress={this.logout} disabled={this.state.isLoggingOut}/>
                </View>
            </Card>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.login.username,
    isLoggingOut: state.login.fetching,
    hasLoggedIn: state.login.hasLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(LoginActions.logoutRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
