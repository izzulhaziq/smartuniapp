import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View } from 'react-native'
import styles from './Styles/ClassInfoStyle'
import { Divider, Icon, Avatar, COLOR } from 'react-native-material-ui'
import Color from 'color'
import { Container, Content, Card, CardItem, Text, Body } from 'native-base'
import { ApplicationStyles, Metrics, Colors, uiTheme } from '../Themes'

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
      ok: Color(COLOR.lightGreen300).alpha(1.0).toString(),
      warning: Color(COLOR.amber300).alpha(1.0).toString(),
      danger: Color(COLOR.red300).alpha(1.0).toString()
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
      <View style={{flex: 1}}>
          <Card>
          <View style={styles.statusBackground}>
            <Avatar text={text} size={65} style={{container: {backgroundColor: status}}} />
          </View>
          <View style={styles.status}>
            <Avatar text={text} size={55} style={{container: {backgroundColor: COLOR.blueGrey900}}} />
          </View>
            <CardItem header style={{backgroundColor: '#fff'}}>
              <Body>
                <Divider />
                <Text style={{color: uiTheme.palette.alternateTextColor}} >{this.props.data.name}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <View style={styles.container}>
                  <Icon name='person' size={22} />
                  <Text style={styles.label}> {this.props.data.lecturer}</Text>
                </View>
              </Body>
            </CardItem>
          </Card>
      </View>
    )
  }
}
