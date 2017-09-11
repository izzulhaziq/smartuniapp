import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import styles from './Styles/ClassInfoStyle'
import { Card, Divider, Icon, Avatar } from 'react-native-material-ui'
import { COLOR } from 'react-native-material-ui'

export default class ClassInfo extends Component {
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

  render () {
    const classMissedLimit = 3
    const acceptableMissRate = 0.7
    const { attendance } = this.props.data
    const colorPallette = {
      ok: COLOR.lightGreen700,
      warning: COLOR.amber700,
      danger: COLOR.red700
    }

    const missedRate = ((attendance[1] - attendance[0]) / classMissedLimit).toFixed(1)
    let status = colorPallette.danger
    if (missedRate >= acceptableMissRate && missedRate < 1) {
      status = colorPallette.warning
    } else if (missedRate >= 1) {
      status = colorPallette.danger
    } else {
      status = colorPallette.ok
    }

    const text = (attendance[0] / attendance[1] * 100) + '%'

    return (
      <View>
        <Card fullWidth={false}>
          <Text style={styles.boldLabel}>{this.props.data.name}</Text>

          <View style={styles.statusBackground}>
            <Avatar text={text} size={65} style={{container: {backgroundColor: status}}} />
          </View>
          <View style={styles.status}>
            <Avatar text={text} size={55} style={{container: {backgroundColor: COLOR.blueGrey900}}} />
          </View>
          <Divider />
          <View style={styles.container}>
            <Icon name='person' size={22}/>
            <Text style={styles.label}> {this.props.data.lecturer}</Text>
          </View>
        </Card>
      </View>
    )
  }
}
