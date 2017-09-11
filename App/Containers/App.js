import '../Config'
import DebugConfig from '../Config/DebugConfig'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import RootContainer from './RootContainer'
import createStore from '../Redux'
import { COLOR, ThemeProvider } from 'react-native-material-ui'
import Color from 'color'

// create our store
const store = createStore()

const uiTheme = {
  palette: {
    // main theme colors
    primaryColor: COLOR.blueGrey900,
    accentColor: COLOR.pink500,
    // text color palette
    primaryTextColor: Color(COLOR.black).alpha(.87).toString(),
    secondaryTextColor: Color(COLOR.black).alpha(.54).toString(),
    alternateTextColor: COLOR.white,
    // backgournds and borders
    canvasColor: COLOR.white,
    borderColor: Color(COLOR.black).alpha(.12).toString(),
    // https://material.google.com/style/color.html#color-text-background-colors
    disabledColor: Color(COLOR.black).alpha(.38).toString(),
    disabledTextColor: Color(COLOR.black).alpha(.26).toString(),
    activeIcon: Color(COLOR.black).alpha(.54).toString(),
    inactiveIcon: Color(COLOR.black).alpha(.38).toString(),
    // pickerHeaderColor: cyan500,
    // clockCircleColor: faintBlack,
    // shadowColor: fullBlack,
  },
  card: {
    container: {
      padding: 10,
    }
  },
  drawerHeader: {
    contentContainer: {
      backgroundColor: COLOR.blueGrey900
    }
  },
  drawerHeaderListItem: {
    primaryText: {
      color: COLOR.white
    },
    secondaryText: {
      color: COLOR.white
    }
  }
}

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <ThemeProvider uiTheme={uiTheme}>
          <RootContainer />
        </ThemeProvider>
      </Provider>
    )
  }
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App
