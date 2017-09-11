import React, { Component } from 'react'
import { View, Text, ListView, FlatList, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Toolbar, Subheader, ListItem, Card, Divider, Icon, Button, Avatar } from 'react-native-material-ui'

// Styles
import styles from './Styles/AttendanceHistoryScreenStyle'

class AttendanceHistoryScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Recent'
  }

  constructor(props) {
    super(props)

    this.state = {
      attending: props.attending
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      attending: nextProps.attending
    })
  }

  render () {
    const { attending: activeLecture } = this.state;
    return (
      <View style={styles.mainContainer}>
        <View>
          <Toolbar
            leftElement={'menu'}
            centerElement='Recent attendances'
            rightElement=''
            isSearchActive={false}
            onLeftElementPress={() => this.props.navigation.navigate("DrawerOpen")}
          />
        </View>

        <ScrollView style={styles.container}>
          { activeLecture &&
            <View>
              <Subheader text={'Currently attending'} />
              <Card fullWidth>
                  <Text style={styles.boldLabel}>{ activeLecture.name }</Text>
                  <Divider />
                  <Text style={styles.label}>{ activeLecture.location }</Text> 
                  <Text style={styles.label}>{ activeLecture.time }</Text> 
              </Card>
            </View>
          }
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    attending: state.attendance.attending
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceHistoryScreen)
