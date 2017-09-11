import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Avatar, Drawer } from 'react-native-material-ui'

class SideBar extends Component {
  render () {
    const { state } = this.props.navigation
    return (
      <Drawer>
        <Drawer.Header>
          <Drawer.Header.Account
            avatar={<Avatar text={'A'} />}
            footer={{
              dense: true,
              centerElement: {
                primaryText: 'Izzul Haziq',
                secondaryText: this.props.username
              }
            }}
          />
        </Drawer.Header>

        { !this.props.hasLoggedIn &&
          <Drawer.Section
            items={[
              { 
                icon: 'warning',
                value: 'Please sign in'
              }
            ]}
          />
        }

        { this.props.hasLoggedIn &&
          <Drawer.Section
            divider
            items={[
              {
                icon: 'history',
                value: 'Attendance',
                onPress: () => this.props.navigation.navigate('Attendance'),
                active: state.routeName === 'Attendance'
              },
              {
                icon: 'business',
                value: 'Classes',
                onPress: () => this.props.navigation.navigate('Classes'),
                active: state.routeName === 'Classes'
              }
            ]}
          />
        }

        { this.props.hasLoggedIn &&
          <Drawer.Section
            items={[
              {
                icon: 'settings',
                value: 'Settings',
                onPress: () => this.props.navigation.navigate('Settings'),
                active: state.routeName === 'Settings'
              }
            ]}
          />
        }
      </Drawer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.login.username,
    hasLoggedIn: state.login.hasLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)
