import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import { ListItem, Icon, COLOR } from 'react-native-material-ui'
import format from 'date-fns/format'

import styles, { listItemStyles } from './Styles/ScheduleStyle'
import { ApplicationStyles, Metrics, Colors, uiTheme } from '../Themes'

export default class Schedule extends Component {

  render () {
    const timeFrom = format(this.props.dateFrom, 'h:mm A')
    const timeTo = format(this.props.dateTo, 'h:mm A')
    const { isActive, isAttendance } = this.props;
    const defaultColor = isAttendance ? COLOR.grey300 : uiTheme.palette.accentColor
    const color = isActive ? COLOR.lightGreen300 : defaultColor
      
    return (
      <ListItem
        divider
        leftElement={
          <Icon name='business' size={40} style={{color: color}}/>
        }
        centerElement={{
          primaryText: this.props.name,
          secondaryText: this.props.location,
          tertiaryText: `${timeFrom} - ${timeTo}`
        }}
        rightElement={null}
        numberOfLines={3}
        style={listItemStyles}
      />
    )
  }
}
