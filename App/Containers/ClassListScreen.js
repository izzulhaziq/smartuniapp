import React, { Component } from 'react'
import { View, Text, ListView, FlatList } from 'react-native'
import { connect } from 'react-redux'
import Attendable from '../Components/Attendable'

// For empty lists
// import AlertMessage from '../Components/AlertMessage'

// Styles
import styles from './Styles/ClassListScreenStyle'

class ClassListScreen extends Component {
  state: {
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
      {key: 1, title: 'React 101', description: 'Learn the basic of building react app', time: '8:00 AM', uuid: 'e2c56db5-dffb-48d2-b060-d0f5a71096e0'},
      {key: 2, title: 'Golang 101', description: 'Learn the fun of Golang', time: '9:00 AM'},
      {key: 3, title: 'Microservices 101', description: 'Learn how to build your 1st microservice', time: '2:00 PM'}
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
      dataObjects: dataObjects
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
      /**
      <View style={styles.row}>
        <Text style={styles.boldLabel}>{rowData.title} ({rowData.time})</Text>
        <Text style={styles.label}>{rowData.description}</Text>
        { rowData.uuid &&
          <BeaconBase
            uuid={rowData.uuid}
            identifier='smartuni'
            onEnter={this.onEnter}/> }
      </View>
       */
      <Attendable data={item} />
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
      /**
      <View style={styles.container}>
          <ListView
          contentContainerStyle={styles.listContent}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderFooter={this.renderFooter}
          enableEmptySections
          pageSize={15}
        />
       */
      <View style={styles.container}>
        <FlatList
          ref='scheduleList'
          data={this.state.dataObjects}
          extraData={this.props}
          renderItem={this.renderRow}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
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
