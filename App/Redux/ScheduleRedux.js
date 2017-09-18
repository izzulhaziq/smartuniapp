import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  scheduleSyncRequest: ['dateFrom', 'dateTo'],
  scheduleSyncSuccess: ['data'],
  scheduleSyncFailure: null
})

export const ScheduleTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  synching: null,
  lastSync: null,
  success: null,
  error: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const syncRequest = (state) =>
  state.merge({ synching: true, data: null, success: null, error: null })

// successful api lookup
export const syncSuccess = (state, action) => {
  const { data } = action
  return state.merge({
    lastSync: new Date(),
    synching: false,
    success: true,
    error: null,
    data })
}

// Something went wrong somewhere.
export const syncFailure = state =>
  state.merge({ synching: false, error: true, success: false, data: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SCHEDULE_SYNC_REQUEST]: syncRequest,
  [Types.SCHEDULE_SYNC_SUCCESS]: syncSuccess,
  [Types.SCHEDULE_SYNC_FAILURE]: syncFailure
})
