import { call, put } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import LoginActions from '../Redux/LoginRedux'

export function * login (api, action) {
  const { username, password } = action
  // make the call to the api
  const response = yield call(api.login, username, password)
  yield delay(2000)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(LoginActions.loginSuccess(response.data))
  } else {
    yield put(LoginActions.loginFailure())
  }
}

export function * logout () {
  // TODO: Call to delete JWT
  console.log('logout saga')
  var success = true;
  yield delay(2000)

  if (success) {
    console.log('logout saga ducces')
    yield put(LoginActions.logoutSuccess())
  } else {
    yield put(LoginActions.logoutFailure())
  }
}