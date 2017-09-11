import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import BeaconActions from '../Redux/BeaconRedux'
import AttendanceActions from '../Redux/AttendanceRedux'
import { Toolbar, Subheader, ListItem, Card, Divider, Icon, Button, Avatar } from 'react-native-material-ui'
import _ from 'lodash'
import { COLOR } from 'react-native-material-ui'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/AttendableScreenStyle'
import { listItemStyles } from './Styles/AttendableScreenStyle'

class AttendableScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Nearby'
  }

  constructor(props) {
    super(props)

    const classes = [
      {
        id: 1,
        name: 'React 103',
        location: 'Hall 04',
        time: '2:00 PM - 3:00 PM',
        beaconId: '8F3a'
      },
      {
        id: 1,
        name: 'Chemistry 101',
        location: 'Hall 05',
        time: '2:00 PM - 3:00 PM',
        beaconId: '8F3b'
      }
    ]

    this.state = {
      isScanning: props.isScanning,
      registeredClasses: classes,
      classes: [],
      attending: props.attending
    }

    this.toggleScan = this.toggleScan.bind(this)
    this.registerAttendance = this.registerAttendance.bind(this)
    this.isAttending = this.isAttending.bind(this)
    this.mapBeaconsToClasses = this.mapBeaconsToClasses.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    const classes = this.mapBeaconsToClasses(nextProps.beacons, this.state.registeredClasses)
    this.setState({
      classes: nextProps.isScanning ? classes : [],
      attending: nextProps.attending
    })
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
        return b.uniqueId == c.beaconId
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
    }
    else {
      this.props.stopScanning('Kontakt')
    }
  }

  registerAttendance (classId) {
    const lecture = _.filter(this.state.registeredClasses, c =>
      c.id === classId)
    
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

    const distance = item.distance ? item.distance.toFixed(2) : 'NA';
    const backgroundColor = item.isAttending ? COLOR.lightGreen500 : COLOR.blueGrey200

    return (
      <ListItem
        divider
        leftElement={
          <Avatar 
            text={<Icon name='business' size={20}/>}
            size={40}
            style={{container: {backgroundColor: backgroundColor}}} />
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
    const buttonText = this.props.isScanning ? "Stop" : "Scan"
    return (
      <View style={styles.mainContainer}>
        <View>
          <Toolbar
            leftElement={'menu'}
            centerElement='Nearby classes'
            rightElement=''
            isSearchActive={false}
            onLeftElementPress={() => this.props.navigation.navigate("DrawerOpen")}
          />
        </View>

        <ScrollView style={styles.container}>
          <Card fullWidth>
            <Text style={styles.boldLabel}>Scanning status..</Text>
            <Divider />
            <Button accent raised text={buttonText} onPress={this.toggleScan} />
            <Text style={styles.label}>Last scan: 2:01 PM</Text>
          </Card>
          <Subheader text={ `Found (${this.state.classes.length})` } />
          { this.state.classes.map((item) => this.renderRow(item)) }
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isScanning: state.beacon.isScanning,
    beacons: state.beacon.beacons,
    attending: state.attendance.attending
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
