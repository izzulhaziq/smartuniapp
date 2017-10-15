import React, { Component } from 'react'
import { View, Text, ListView, FlatList, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Toolbar, Subheader, Card, Divider, Icon, Button, Avatar, ListItem, COLOR } from 'react-native-material-ui'
import { Container, Content, Footer, Body, Left } from 'native-base'
import Schedule from '../Components/Schedule'
import { find, sort, dropWhile } from 'ramda'
import { isToday, isBefore } from 'date-fns'
import { nextSchedule } from '../Services/ScheduleService'

// Styles
import styles, { listItemStyles } from './Styles/AttendanceHistoryScreenStyle'
import { ApplicationStyles, Metrics, Colors, uiTheme } from '../Themes'

class AttendanceHistoryScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Recent'
  }

  constructor(props) {
    super(props)

    this.state = {
      attending: props.attending
    }

    this.getNextSchedule = this.getNextSchedule.bind(this)
    this.renderRecents = this.renderRecents.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      attending: nextProps.attending
    })
  }

  getNextSchedule () {
    return nextSchedule(this.props.schedules, new Date())
  }

  renderAttendance (item) {
    return (
      <ListItem
        divider
        leftElement={
          <Icon name='business' size={40} style={{color: uiTheme.palette.complimentaryColor}}/>
        }
        centerElement={{
          primaryText: item.name,
          secondaryText: item.location,
          tertiaryText: item.time
        }}
        numberOfLines={3}
        style={listItemStyles}
      />
    )
  }

  renderRecents() {
    return this.props.recents.map(item =>
        <Schedule {...item} />
    )
  }

  render () {
    const { attending: activeLecture } = this.state
    const nextSchedule = this.props.nextSchedule

    return (
      <View style={styles.mainContainer}>
        <View>
          <Toolbar
            leftElement={'menu'}
            centerElement='// Recent'
            rightElement=''
            isSearchActive={false}
            onLeftElementPress={() => this.props.navigation.navigate("DrawerOpen")}
          />
        </View>

        <Container>
            <Content style={{backgroundColor: '#fcf9f9'}}>
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
                  Your recent attendances
                </Text>
              </View>
              <View style={{marginLeft: 10, marginRight: 10}}>
                <Card fullWidth>
                  { activeLecture &&
                    <View>
                      <Text style={styles.boldLabel}>Now</Text>
                      <Divider />

                      { this.renderAttendance(activeLecture) }
                    </View>
                  }
                  { !activeLecture && !nextSchedule &&
                    <View>
                      <Text style={styles.boldLabel}>You don't have any more classes today</Text>
                      <Divider />
                      <Button accent raised text='My schedule'/>
                    </View>
                  }
                  { !activeLecture && nextSchedule &&
                    <View>
                      <Text style={styles.boldLabel}>Your next class</Text>
                      <Divider />
                      { <Schedule {...nextSchedule } /> }
                    </View>
                  }
                </Card>
                <Card fullWidth>
                  <View>
                    <Text style={styles.boldLabel}>Today</Text>
                    <Divider />
                    { this.props.recents && this.props.recents.length > 0 &&
                      this.renderRecents()
                    }
                    { (!this.props.recents || this.props.recents.length < 1) &&
                      <Text style={styles.label}>No recent attendance</Text>  
                    }
                  </View>
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
    attending: state.attendance.attending,
    schedules: state.schedule.data,
    recents: state.attendance.recents,
    nextSchedule: state.attendance.next
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceHistoryScreen)
