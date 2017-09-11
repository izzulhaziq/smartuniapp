import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import _ from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  beaconRanged: ['data'],
  beaconStartRanging: ['identifier'],
  beaconStopRanging: ['identifier'],
  beaconRangingStarted: null,
  beaconRangingStopped: null,
  beaconAppeared: ['beacon', 'namespace'],
  beaconDisappeared: ['beacon', 'namespace'],
  beaconUpdated: ['beacons', 'namespace']
})

export const BeaconTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  rangingData: null,
  isScanning: false,
  beacons: []
})

/* ------------- Reducers ------------- */

const isIdenticalBeacon = (b1, b2) => {
  return b1.uniqueId == b2.uniqueId
}

/*
* Stores new beacon found if it doesn't exist
*/
export const beaconAppeared = (state, { beacon, namespace }) => {
  const existing = _.filter(state.beacons, (b) => 
    isIdenticalBeacon(b, beacon)
  )
  if (existing.length > 0) {
    return state
  }

  return state.merge({
    beacons: state.beacons.concat(beacon)
  })
}

/*
* Removes disappeared beacon from the state
*/
export const beaconDisappeared = (state, { beacon, namespace }) => {
  return state.merge({
    beacons: _.filter(state.beacons, (b) =>
      !isIdenticalBeacon(b, beacon)
    )
  })
}

/*
* Update beacon information in the beacon list
*/
export const beaconUpdated = (state, { beacons: updatedBeacons, namespace }) => {
  let { beacons } = state;
  updatedBeacons.forEach(updatedBeacon => {
    const index = beacons.findIndex(beacon =>
      isIdenticalBeacon(updatedBeacon, beacon)
    );

    beacons = beacons.reduce((result, val, ind) => {
      // replace current beacon values for updatedBeacon, keep current value for others
      ind === index ? result.push(updatedBeacon) : result.push(val);
      return result;
    }, [])
  });
  return state.merge({
    beacons: beacons
  })
}

export const ranging = (state, { data }) => {
  return state.merge({
    data
  })
}

/*
* Set the current app state to scanning.
*/
export const rangingStarted = (state) => {
  return state.merge({ isScanning: true })
}

/*
* Set the current app state to scan stopped.
*/
export const rangingStopped = (state) => {
  return state.merge({ isScanning: false, data: null })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.BEACON_RANGING_STARTED]: rangingStarted,
  [Types.BEACON_RANGING_STOPPED]: rangingStopped,
  [Types.BEACON_RANGED]: ranging,
  [Types.BEACON_APPEARED]: beaconAppeared,
  [Types.BEACON_DISAPPEARED]: beaconDisappeared,
  [Types.BEACON_UPDATED]: beaconUpdated
})
