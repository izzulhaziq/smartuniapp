import React, { Component } from 'react'
import { View, Text, ListView, FlatList, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import ClassInfo from '../Components/ClassInfo'
import { Toolbar, Subheader } from 'react-native-material-ui'

// For empty lists
// import AlertMessage from '../Components/AlertMessage'

// Styles
import styles from './Styles/ClassListScreenStyle'

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
    return (
      <ClassInfo data={item} />
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
              centerElement='Classes registered'
              rightElement=''
              isSearchActive={false}
              onLeftElementPress={() => this.props.navigation.navigate("DrawerOpen")}
            />
          </View>
        <ScrollView style={styles.container}>
          <Subheader text="Mandatory" />
          <View>
            <FlatList
              ref='scheduleList'
              data={this.state.dataObjects}
              extraData={this.props}
              renderItem={this.renderRow}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <Subheader text="Electives" />
          <View>
            <FlatList
              ref='electives'
              data={this.state.electives}
              extraData={this.props}
              renderItem={this.renderRow}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </ScrollView>
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
