import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import { Root } from "native-base";

// Styles
import styles from './Styles/RootContainerStyles'
import { ApplicationStyles, Metrics, Colors, uiTheme } from '../Themes'

class RootContainer extends Component {
  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }

  render () {
    return (
      <Root>
      <View style={styles.applicationView}>
        <StatusBar backgroundColor={uiTheme.palette.darkPrimaryColor} barStyle='light-content' />
        <ReduxNavigation />
      </View>
      </Root>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapDispatchToProps)(RootContainer)
