import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import styles from './Styles/AttendableStyle'
import BeaconBase from '../Components/BeaconBase'
import { Card, Divider } from 'react-native-material-ui'

export default class Attendable extends Component {
  state = {
    hasCheckedIn: false,
    hasCheckedOut: false
  }

  constructor (props) {
    super(props)

    // Datasource is always in state
    this.state = {
      hasCheckedIn: false,
      hasCheckedOut: false,
      distance: 0
    }

    this.onEnter = this.onEnter.bind(this)
    this.onExit = this.onExit.bind(this)
    this.onWithinRange = this.onWithinRange.bind(this)
  }
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }
  onEnter () {
    this.setState({ hasCheckedIn: true })
  }

  onExit () {
    this.setState({ hasCheckedOut: false })
  }

  onWithinRange (data) {
    const beacon = data.beacons[0]
    let distance = 'NA'
    if (beacon.distance) {
      distance = beacon.distance.toFixed(2)
    }
    this.setState({
      hasCheckedIn: true,
      distance: distance
    })
  }

  render () {
    return (
      <View>
        <Card fullWidth={false}>
          <Text style={styles.boldLabel}>{this.props.data.title}</Text>
          <Divider />
          <Text style={styles.label}>{this.props.data.description}</Text>
          <Text style={styles.label}>Checked in: {this.state.hasCheckedIn ? 'Yes' : 'No'}</Text>
          <Text style={styles.label}>Checked out: {this.state.hasCheckedOut ? 'Yes' : 'No'}</Text>
          <Text style={styles.label}>Distance: {this.state.distance} m</Text>
          { this.props.data.uuid &&
            <BeaconBase
              uuid={this.props.data.uuid}
              identifier='Kontakt'
              onEnter={this.onEnter}
              onExit={this.onExit}
              onWithinRange={this.onWithinRange}
              fenceDistance={1} /> }
        </Card>
      </View>
    )
  }
}
