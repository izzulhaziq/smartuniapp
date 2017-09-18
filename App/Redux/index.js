import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    nav: require('./NavigationRedux').reducer,
    github: require('./GithubRedux').reducer,
    search: require('./SearchRedux').reducer,
    beacon: require('./BeaconRedux').reducer,
    attendance: require('./AttendanceRedux').reducer,
    login: require('./LoginRedux').reducer,
    schedule: require('./ScheduleRedux').reducer
  })

  return configureStore(rootReducer, rootSaga)
}
