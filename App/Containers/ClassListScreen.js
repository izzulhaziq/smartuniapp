import React, { Component } from 'react'
import { View, Text, ListView, FlatList, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import ClassInfo from '../Components/ClassInfo'
import { Toolbar, Subheader, Divider, COLOR, Card, Avatar } from 'react-native-material-ui'
import { Container, Content, Footer, List, ListItem, Body, Left } from 'native-base'
import Color from 'color'

// For empty lists
// import AlertMessage from '../Components/AlertMessage'

// Styles
import styles from './Styles/ClassListScreenStyle'
import { ApplicationStyles, Metrics, Colors, uiTheme } from '../Themes'

class ClassListScreen extends Component {
  static state: {
    dataSource: Object
  }

  constructor (props) {
    super(props)
    /* ***********************************************************
    * STEP 1
    * This is an array of objects with the properties you desire
    * Usually this should come from Redux mapStateToProps
    *************************************************************/
    const dataObjects = [
      {
        key: 1,
        name: 'React 103',
        lecturer: 'Dr. Michelle Wong',
        attendance: [5, 5]
      },
      {
        key: 2,
        name: 'Golang 101',
        lecturer: 'Dr Fahmi Adam',
        attendance: [3, 5]
      },
      {
        key: 3,
        name: 'Microservices 101',
        lecturer: 'Dr Pham Kung King',
        attendance: [4, 5]
      }
    ]

    const electives = [
      {
        key: 1,
        name: 'Accounting',
        lecturer: 'Dr. Anjana Vakil',
        attendance: [1, 5]
      },
      {
        key: 2,
        name: 'Human & Resources',
        lecturer: 'Dr Khalessi',
        attendance: [5, 5]
      }
    ]

    /* ***********************************************************
    * STEP 2
    * Teach datasource how to detect if rows are different
    * Make this function fast!  Perhaps something like:
    *   (r1, r2) => r1.id !== r2.id}
    *************************************************************/
    const rowHasChanged = (r1, r2) => r1 !== r2

    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged})

    // Datasource is always in state
    this.state = {
      dataSource: ds.cloneWithRows(dataObjects),
      dataObjects: dataObjects,
      electives: electives
    }
  }

  /* ***********************************************************
  * STEP 3
  * `renderRow` function -How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={rowData.title} description={rowData.description} />
  *************************************************************/
  renderRow = ({item}) => {
    /*return (
      <ClassInfo data={item} />
    )*/
    if (!item) {
      return null
    }
    const classMissedLimit = 3
    const acceptableMissRate = 0.7
    const { attendance } = item
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
      <ListItem avatar>
        <Left>
          <View style={{marginLeft: 0, paddingLeft: 0, paddingTop: 10}}>
            <Avatar text={text} size={50} style={{container: {backgroundColor: status}}} />
          </View>
        </Left>
        <Body>
          <Text>{item.name}</Text>
          <Text note>{item.lecturer}</Text>
        </Body>
      </ListItem>
    )
  }

  /* ***********************************************************
  * STEP 4
  * If your datasource is driven by Redux, you'll need to
  * reset it when new data arrives.
  * DO NOT! place `cloneWithRows` inside of render, since render
  * is called very often, and should remain fast!  Just replace
  * state's datasource on newProps.
  *
  * e.g.
    componentWillReceiveProps (newProps) {
      if (newProps.someData) {
        this.setState(prevState => ({
          dataSource: prevState.dataSource.cloneWithRows(newProps.someData)
        }))
      }
    }
  *************************************************************/

  // Used for friendly AlertMessage
  // returns true if the dataSource is empty
  noRowData () {
    return this.state.dataSource.getRowCount() === 0
  }

  // Render a footer.
  renderFooter = () => {
    return (
      <Text> - Footer - </Text>
    )
  }

  render () {
    return (
      <View style={styles.mainContainer}>
          <View>
            <Toolbar
              leftElement={'menu'}
              centerElement='// Classes'
              rightElement=''
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
                  Your classes this semester
                </Text>
              </View>
              <View style={{marginLeft: 10, marginRight: 10}}>
                <Card fullWidth style={{ container: { padding: 0 }}}>
                  <List>
                    <ListItem itemDivider>
                      <Text>Mandatory</Text>
                    </ListItem> 
                    <FlatList
                      ref='scheduleList'
                      data={this.state.dataObjects}
                      extraData={this.props}
                      renderItem={this.renderRow}
                      showsVerticalScrollIndicator={false}
                    />
                    <ListItem itemDivider>
                      <Text>Electives</Text>
                    </ListItem> 
                    <FlatList
                      ref='electives'
                      data={this.state.electives}
                      extraData={this.props}
                      renderItem={this.renderRow}
                      showsVerticalScrollIndicator={false}
                    />
                  </List>
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
    // ...redux state to props here
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassListScreen)
