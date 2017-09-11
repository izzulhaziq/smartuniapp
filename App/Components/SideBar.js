import React, { Component } from 'react'
import { Avatar, Drawer } from 'react-native-material-ui'

export default class SideBar extends Component {
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
                secondaryText: 'izzulhaziq@gmail.com'
              }
            }}
          />
        </Drawer.Header>
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
      </Drawer>
    )
  }
}
