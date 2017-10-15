import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'
import Color from 'color'
import { COLOR, ThemeProvider } from 'react-native-material-ui'

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  screen: {
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.transparent
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    container: {
      flex: 1,
      paddingTop: Metrics.smallMargin,
      backgroundColor: Colors.transparent
    },
    section: {
      margin: Metrics.section,
      padding: Metrics.baseMargin
    },
    sectionText: {
      ...Fonts.style.normal,
      paddingVertical: Metrics.doubleBaseMargin,
      color: Colors.snow,
      marginVertical: Metrics.smallMargin,
      textAlign: 'center'
    },
    subtitle: {
      color: Colors.snow,
      padding: Metrics.smallMargin,
      marginBottom: Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin
    },
    titleText: {
      ...Fonts.style.h2,
      fontSize: 14,
      color: Colors.text
    }
  },
  darkLabelContainer: {
    padding: Metrics.smallMargin,
    paddingBottom: Metrics.doubleBaseMargin,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    marginBottom: Metrics.baseMargin
  },
  darkLabel: {
    fontFamily: Fonts.type.bold,
    color: Colors.snow
  },
  groupContainer: {
    margin: Metrics.smallMargin,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  sectionTitle: {
    ...Fonts.style.h4,
    color: Colors.coal,
    backgroundColor: Colors.ricePaper,
    padding: Metrics.smallMargin,
    marginTop: Metrics.smallMargin,
    marginHorizontal: Metrics.baseMargin,
    borderWidth: 1,
    borderColor: Colors.ember,
    alignItems: 'center',
    textAlign: 'center'
  }
}

const palettes = {
  // main theme colors
  //darkPrimaryColor: Color('#FB6666').alpha(1.0).toString(),
  //darkPrimaryColor: Color('#E94444').alpha(1.0).toString(),
  //primaryColor: Color('#FA5555').alpha(1.0).toString(),
  darkPrimaryColor: Color(COLOR.blueGrey800).alpha(1.0).toString(),
  primaryColor: Color(COLOR.blueGrey700).alpha(1.0).toString(),
  //accentColor: Color(COLOR.lightBlue300).alpha(1.0).toString(),
  accentColor: Color('#FD8888').alpha(1.0).toString(),
  complimentaryColor: Color(COLOR.lightBlue300).alpha(1.0).toString(),
  // text color palette
  primaryTextColor: Color(COLOR.black).alpha(0.87).toString(),
  secondaryTextColor: Color(COLOR.black).alpha(0.54).toString(),
  alternateTextColor: COLOR.white,
  // backgournds and borders
  canvasColor: COLOR.white,
  borderColor: Color(COLOR.black).alpha(0.12).toString(),
  // https://material.google.com/style/color.html#color-text-background-colors
  disabledColor: Color(COLOR.black).alpha(0.38).toString(),
  disabledTextColor: Color(COLOR.black).alpha(0.26).toString(),
  activeIcon: Color(COLOR.black).alpha(0.54).toString(),
  inactiveIcon: Color(COLOR.black).alpha(0.38).toString()
  // pickerHeaderColor: cyan500,
  // clockCircleColor: faintBlack,
  // shadowColor: fullBlack,
}

export const uiTheme = {
  palette: {
    ...palettes
  },
  button: {
    container: {
      paddingVertical: 25
    }
  },
  card: {
    container: {
      padding: 15
    }
  },
  drawerHeader: {
    contentContainer: {
      backgroundColor: palettes.darkPrimaryColor
    }
  },
  drawerHeaderListItem: {
    primaryText: {
      color: COLOR.white
    },
    secondaryText: {
      color: COLOR.white
    }
  },
  drawerSection: {
    leftElement: {
      color: COLOR.pink200,
    }
  }
}

export default ApplicationStyles
