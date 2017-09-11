import { takeLatest, takeEvery, call } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { BeaconTypes } from '../Redux/BeaconRedux'
import { LoginTypes } from '../Redux/LoginRedux'

/* ------------- Sagas ------------- */

import { beaconRanging, startRanging, stopRanging } from './BeaconSagas'
import { startup, teardown } from './StartupSagas'
import { login, logout } from './LoginSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield call(startup)
  yield [
    takeLatest(BeaconTypes.BEACON_START_RANGING, startRanging),
    takeLatest(BeaconTypes.BEACON_STOP_RANGING, stopRanging),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logout),
    call(beaconRanging)
  ]
  yield call(teardown)
}
