import React, {
  Component
} from 'react'
// import PropTypes from 'prop-types';
import {
  Text,
  DeviceEventEmitter
} from 'react-native'

import Beacons from 'react-native-beacons-manager'
// import moment from 'moment'

export default class BeaconBase extends Component {
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
  state = {
     // region information
    uuid: '',
    identifier: ''
  };

  constructor (props) {
    super(props)

    this.state = {
      uuid: props.uuid,
      identifier: props.identifier
    }
  }

  componentWillMount () {
    const { identifier, uuid } = this.state

    // start iBeacon detection
    Beacons.detectIBeacons()

    Beacons
      .startRangingBeaconsInRegion(identifier, uuid) // or like  < v1.0.7: .startRangingBeaconsInRegion(identifier, uuid)
      .then(() => console.log('Beacons ranging started succesfully'))
      .catch(error => console.log(`Beacons ranging not started, error: ${error}`))

    Beacons
      .startMonitoringForRegion(identifier, uuid) // or like  < v1.0.7: .startRangingBeaconsInRegion(identifier, uuid)
      .then(() => console.log('Beacons monitoring started succesfully'))
      .catch(error => console.log(`Beacons monitoring not started, error: ${error}`))
  }

  componentDidMount () {
    // Ranging: Listen for beacon changes
    DeviceEventEmitter.addListener(
      'beaconsDidRange',
      (data) => {
        console.log('beaconsDidRange data: ', data)
        if (data.beacons.length > 0 && this.props.onWithinRange) {
          this.props.onWithinRange(data)
        }
      }
    )

    // monitoring:
    DeviceEventEmitter.addListener(
      'regionDidEnter',
      ({ identifier, uuid, minor, major }) => {
        console.log('monitoring - regionDidEnter data: ', { identifier, uuid, minor, major })
        if (this.props.onEnter) {
          this.props.onEnter()
        }
      }
    )

    DeviceEventEmitter.addListener(
      'regionDidExit',
      ({ identifier, uuid, minor, major }) => {
        console.log('monitoring - regionDidExit data: ', { identifier, uuid, minor, major })
        if (this.props.onExit) {
          this.props.onExit()
        }
      }
    )
  }

  componentWillUnMount () {
    const { uuid, identifier } = this.state

    Beacons
      .stopRangingBeaconsInRegion(identifier, uuid) // or like  < v1.0.7: .stopRangingBeaconsInRegion(identifier, uuid)
      .then(() => console.log('Beacons ranging stopped succesfully'))
      .catch(error => console.log(`Beacons ranging not stopped, error: ${error}`))

    Beacons
      .stopMonitoringForRegion(identifier, uuid) // or like  < v1.0.7: .stopMonitoringForRegion(identifier, uuid)
      .then(() => console.log('Beacons monitoring stopped succesfully'))
      .catch(error => console.log(`Beacons monitoring not stopped, error: ${error}`))

    // remove monitoring events we registered at componentDidMount
    DeviceEventEmitter.removeListener('regionDidEnter')
    DeviceEventEmitter.removeListener('regionDidExit')

    // remove ranging event we registered at componentDidMount
    DeviceEventEmitter.removeListener('beaconsDidRange')
  }

  render () {
    return (<Text />)
  }
}
