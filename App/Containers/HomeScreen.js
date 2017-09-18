import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View } from 'react-native'
import { connect } from 'react-redux'
import { Toolbar, Subheader, Card, Divider, ListItem, Icon, Button, Avatar, COLOR } from 'react-native-material-ui'
import { Container, Content, Footer, Body, Left, Spinner } from 'native-base'
import Schedule from '../Components/Schedule'
import ScheduleActions from '../Redux/ScheduleRedux'
import format from 'date-fns/format'

// Styles
import styles, { listItemStyles } from './Styles/HomeScreenStyle'
import { ApplicationStyles, Metrics, Colors, uiTheme } from '../Themes'

class HomeScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: '// Home'
  })

  constructor (props) {
    super(props)

    this.syncSchedule = this.syncSchedule.bind(this)
  }

  componentWillMount () {
    this.syncSchedule()
  }

  syncSchedule () {
    this.props.syncSchedule(new Date())
  }

  renderSchedule (day) {
    return day.schedules.map((item) => {
      return (
        <Schedule {...item} />
        /*<ListItem
          divider
          leftElement={
            <Icon name='business' size={40} style={{color: uiTheme.palette.complimentaryColor}}/>
          }
          centerElement={{
            primaryText: item.name,
            secondaryText: item.location,
            tertiaryText: `${timeFrom} - ${timeTo}`
          }}
          rightElement={null}
          numberOfLines={3}
          style={listItemStyles}
        />
        */
      )
    })
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <View>
          <Toolbar
            leftElement={'menu'}
            centerElement='// Home'
            rightElement={''}
            isSearchActive={false}
            onLeftElementPress={() => this.props.navigation.navigate("DrawerOpen")}
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
                  Hello Izzul Haziq!
                </Text>
              </View>
              <View style={{marginLeft: 10, marginRight: 10}}>
                <Card fullWidth>
                  <View>
                    <Text style={styles.boldLabel}>Your schedule for today</Text>
                    <Divider />
                    { this.props.synching && 
                      <Spinner color='blue' /> }
                    { !this.props.synching && this.props.success &&
                      this.props.data.map((item) => this.renderSchedule(item)) }
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
    data: state.schedule.data,
    synching: state.schedule.synching,
    success: state.schedule.success
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    syncSchedule: (dateFrom, dateTo) => dispatch(ScheduleActions.scheduleSyncRequest(dateFrom, dateTo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
