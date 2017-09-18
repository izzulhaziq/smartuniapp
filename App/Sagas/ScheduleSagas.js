/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { delay } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import ScheduleActions from '../Redux/ScheduleRedux'

export function * syncSchedule (api, action) {
  const { dateFrom, dateTo } = action
  const response = yield call(api.syncSchedule, dateFrom, dateTo)
  yield delay(2000)

  if (response.ok) {
    yield put(ScheduleActions.scheduleSyncSuccess(response.data))
  } else {
    yield put(ScheduleActions.scheduleSyncFailure())
  }
}
