import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import styles from './Styles/AttendableStyle'
import BeaconBase from '../Components/BeaconBase'

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
      hasCheckedOut: false
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
    this.setState({ hasCheckedOut: true })
  }

  onWithinRange () {
    this.setState({ hasCheckedIn: true })
  }

  render () {
    return (
      <View style={styles.row}>
        <Text style={styles.boldLabel}>{this.props.data.title} ({this.props.data.time})</Text>
        <Text style={styles.label}>{this.props.data.description}</Text>
        <Text style={styles.label}>Checked in? {this.state.hasCheckedIn ? 'Yes' : 'No'}</Text>
        <Text style={styles.label}>Checked out? {this.state.hasCheckedOut ? 'Yes' : 'No'}</Text>
        { this.props.data.uuid &&
          <BeaconBase
            uuid={this.props.data.uuid}
            identifier='smartuni'
            onEnter={this.onEnter}
            onExit={this.onExit}
            onWithinRange={this.onWithinRange}
            fenceDistance={1} /> }
      </View>
    )
  }
}
