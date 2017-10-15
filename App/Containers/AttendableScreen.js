import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import BeaconActions from '../Redux/BeaconRedux'
import AttendanceActions from '../Redux/AttendanceRedux'
import { Container, Content, Footer, List, Body, Left } from 'native-base'
import { Toolbar, Subheader, Card, ListItem, Divider, Icon, Button, Avatar, COLOR } from 'react-native-material-ui'
import _ from 'lodash'
import { find, sort, dropWhile } from 'ramda'
import { isToday, isBefore, startOfHour, distanceInWords, isWithinRange } from 'date-fns'
import Schedule from '../Components/Schedule'
import { nextSchedule } from '../Services/ScheduleService'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles, { listItemStyles } from './Styles/AttendableScreenStyle'
import { ApplicationStyles, Metrics, Colors, uiTheme } from '../Themes'

class AttendableScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Check in'
  }

  constructor (props) {
    super(props)

    this.state = {
      isScanning: props.isScanning,
      classes: [],
      attending: props.attending
    }

    this.toggleScan = this.toggleScan.bind(this)
    this.registerAttendance = this.registerAttendance.bind(this)
    this.isAttending = this.isAttending.bind(this)
    this.mapBeaconsToClasses = this.mapBeaconsToClasses.bind(this)
    this.getNextSchedule = this.getNextSchedule.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    const classes = this.mapBeaconsToClasses(nextProps.beacons, this.props.schedules)
    this.setState({
      classes: nextProps.isScanning ? classes : [],
      attending: nextProps.attending
    })
  }

  getNextSchedule () {
    return nextSchedule(this.props.schedules, new Date())
  }

  isAttending (lecture) {
    return this.state.attending && this.state.attending.id === lecture.id
  }

  mapBeaconsToClasses (data, classes) {
    if (!data) return []

    const beaconsInRange = _.filter(data, (b) => {
      return b.accuracy <= 50
    })

    return _.map(beaconsInRange, (b) => {
      const regClass = _.find(classes, (c) => {
        return b.uniqueId === c.beaconId
      })

      if (regClass) {
        return _.merge(regClass, {
          distance: b.accuracy,
          proximity: b.proximity,
          isAttending: this.isAttending(regClass)
        })
      }
    })
  }

  toggleScan () {
    if (!this.props.isScanning) {
      this.props.startScanning('Kontakt')
    } else {
      this.props.stopScanning('Kontakt')
    }
  }

  registerAttendance (classId) {
    const lecture = _.filter(this.state.registeredClasses, c => {
      return c.id === classId
    })
    if (lecture.length > 0) {
      this.props.registerAttendance(lecture[0])
      this.setState(prevState => ({
        classes: prevState.classes.map(c => {
          if (c.id === classId) c.isAttending = true
          return c
        })
      }))
    }
  }

  renderRow (item) {
    if (!item) {
      return null
    }

    const distance = item.distance ? item.distance.toFixed(2) : 'NA'
    const backgroundColor = item.isAttending ? COLOR.lightGreen500 : COLOR.blueGrey200

    return (
      <ListItem
        divider
        leftElement={
          <Icon name='business' size={40} style={{color: backgroundColor}} />
        }
        centerElement={{
          primaryText: item.name,
          secondaryText: `${item.location} (${distance}m)`,
          tertiaryText: item.time
        }}
        rightElement='input'
        onRightElementPress={() => this.registerAttendance(item.id)}
        numberOfLines={3}
        style={listItemStyles}
      />
    )
  }

  render () {
    const buttonText = this.props.isScanning ? 'Disable scanner' : 'Enable scanner'
    const { attending: activeLecture, nextSchedule } = this.props
    const timeLeft = activeLecture && this.props.activeScheduleProgress
      ? distanceInWords(this.props.activeScheduleProgress.timestamp, activeLecture.dateTo)
      : undefined

    return (
      <View style={styles.mainContainer}>
        <View>
          <Toolbar
            leftElement={'menu'}
            centerElement='// Check in'
            rightElement=''
            isSearchActive={false}
            onLeftElementPress={() => this.props.navigation.navigate('DrawerOpen')}
          />
        </View>

        <Container>
          <Content>
            <View style={{
                  flex:1,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  height:100,
                  marginBottom: -40,
                  paddingTop: 20,
                  paddingLeft: 20,
                  backgroundColor: uiTheme.palette.accentColor}} >
              <Text style={{fontSize: 16, fontWeight: 'bold', color: uiTheme.palette.alternateTextColor}}> 
                Find classes nearby
              </Text>
            </View>
            <View style={{marginLeft: 10, marginRight: 10}}>
              <Card fullWidth>
                <View style={{flex:1, flexDirection:'row'}}>
                  <Icon name='info' size={20} />
                  <Text style={styles.boldLabel}>
                     Ensure your bluetooth is turn on
                  </Text>
                </View>
                <Divider />
                <Button accent raised text={buttonText} onPress={this.toggleScan} />
              </Card>
              <Card fullWidth>
                  { activeLecture &&
                    <View>
                      <Text style={styles.boldLabel}>Attending now</Text>
                      <Divider />
                      { <Schedule {...activeLecture } isAttendance={true} isActive={true} /> }
                      { timeLeft &&
                        <Text style={styles.scheduleProgress}>{timeLeft} left</Text>
                      }
                    </View>
                  }
                  { !activeLecture && !nextSchedule &&
                    <View>
                      <Text style={styles.boldLabel}>No more class for today. Yayy!</Text>
                    </View>
                  }
                  { !activeLecture && nextSchedule &&
                    <View>
                      <Text style={styles.boldLabel}>Be ready for your next class</Text>
                      <Divider />
                      { <Schedule {...nextSchedule } isAttendance={true} /> }
                    </View>
                  }
                </Card>
            </View>
          </Content>
        </Container>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isScanning: state.beacon.isScanning,
    beacons: state.beacon.beacons,
    attending: state.attendance.attending,
    schedules: state.schedule.data,
    activeScheduleProgress: state.attendance.progress,
    nextSchedule: state.attendance.next
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startScanning: (identifier) => dispatch(BeaconActions.beaconStartRanging(identifier)),
    stopScanning: (identifier) => dispatch(BeaconActions.beaconStopRanging(identifier)),
    registerAttendance: (lecture) => dispatch(AttendanceActions.attendanceRegister(lecture))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendableScreen)
