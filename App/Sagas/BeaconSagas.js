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
import { DeviceEventEmitter } from 'react-native'
import { call, put, take, cancelled, cancel, fork } from 'redux-saga/effects'
import BeaconActions from '../Redux/BeaconRedux'
import { eventChannel } from 'redux-saga'
import { BeaconTypes } from '../Redux/BeaconRedux'
import BeaconService from '../Services/BeaconService'

/*
* Helper function to create event listener channel
*/
function createEventListenerChannel(eventName, makeHandler) {
  return eventChannel(emit => {
    const handler = makeHandler(emit)
    DeviceEventEmitter.addListener(eventName, handler);

    const unsubscribe = () => {
      DeviceEventEmitter.removeListener(eventName, handler)
    }
    return unsubscribe
  })
}

/*
* Creates handler for eddystone appeared
*/
function eddystoneAppear(emit) {
  return ({ eddystone, namespace }) => {
    console.log('eddystoneDidAppear', eddystone, namespace);
    emit({ beacon: eddystone, namespace})
  }
}

/*
* Listens to events from eddystone appeared channel
*/
function * watchOnEddystoneAppeared() {
  const rangingChannel = yield call(
    createEventListenerChannel,
    BeaconService.BeaconEvents.EDDYSTONE_APPEAR,
    eddystoneAppear)

  try {
    while (true) {
      const { beacon, namespace } = yield take(rangingChannel)
      yield put(BeaconActions.beaconAppeared(beacon, namespace))
    }
  } finally {
    if (yield cancelled()) {
      rangingChannel.close()
      console.log(`stop ${BeaconService.BeaconEvents.EDDYSTONE_APPEAR}`)
    }
  }
}

/*
* Creates handler for eddystone disappeared
*/
function eddystoneDisappear(emit) {
  return ({ eddystone, namespace }) => {
    console.log('eddystoneDisappear', eddystone, namespace);
    emit({ beacon: eddystone, namespace})
  }
}

/*
* Listens to events from eddystone disappeared channel
*/
function * watchOnEddystoneDisappeared() {
  const rangingChannel = yield call(
    createEventListenerChannel,
    BeaconService.BeaconEvents.EDDYSTONE_DISAPPEAR,
    eddystoneDisappear)

  try {
    while (true) {
      const { beacon, namespace } = yield take(rangingChannel)
      yield put(BeaconActions.beaconDisappeared(beacon, namespace))
    }
  } finally {
    if (yield cancelled()) {
      rangingChannel.close()
      console.log(`stop ${BeaconService.BeaconEvents.EDDYSTONE_DISAPPEAR}`)
    }
  }
}

/*
* Creates handler for eddystone updated
*/
function eddystoneUpdated(emit) {
  return ({ eddystones, namespace }) => {
    console.log('eddystoneUpdated', eddystones, namespace);
    emit({ beacons: eddystones, namespace})
  }
}

/*
* Listens to events from eddystone updated channel
*/
function * watchOnEddystoneUpdated() {
  const rangingChannel = yield call(
    createEventListenerChannel,
    BeaconService.BeaconEvents.EDDYSTONE_UPDATE,
    eddystoneUpdated)

  try {
    while (true) {
      const { beacons, namespace } = yield take(rangingChannel)
      yield put(BeaconActions.beaconUpdated(beacons, namespace))
    }
  } finally {
    if (yield cancelled()) {
      rangingChannel.close()
      console.log(`stop ${BeaconService.BeaconEvents.EDDYSTONE_UPDATE}`)
    }
  }
}

export function * beaconRanging() {
  while (yield take(BeaconTypes.BEACON_START_RANGING)) {
    // starts the task in the background
    const eddystoneAppearTask = yield fork(watchOnEddystoneAppeared)
    const eddystoneDisappearTask = yield fork(watchOnEddystoneDisappeared)
    const eddystoneUpdateTask = yield fork(watchOnEddystoneUpdated)

    // wait for the user stop action
    yield take(BeaconTypes.BEACON_STOP_RANGING)

    // user clicked stop. cancel the background task
    // this will cause the forked bgSync task to jump into its finally block
    yield cancel(eddystoneAppearTask)
    yield cancel(eddystoneDisappearTask)
    yield cancel(eddystoneUpdateTask)
  }
}

export function * startRanging(action) {
  const { identifier } = action;
  yield call(BeaconService.startRanging, identifier)
  yield put(BeaconActions.beaconRangingStarted())
}

export function * stopRanging(action) {
  const { identifier } = action;
  yield call(BeaconService.stopRanging, identifier)
  yield put(BeaconActions.beaconRangingStopped())
}