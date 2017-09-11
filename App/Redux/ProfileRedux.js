import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  profileUpdatePersonal: ['profile'],
  profileUpdateClasses: ['classes'],
  profileFailure: null
})

export const ProfileTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  profile: null,
  classes: [],
  payload: null,
  error: null
})

/* ------------- Reducers ------------- */

export const updatePersonalDetail = (state, { profile }) => {
  return state.merge({
    profile
  })
}

export const updateClasses = (state, { classes }) => {
  return state.merge({
    classes
  })
}

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PROFILE_UPDATE_INFO]: updatePersonalDetail,
  [Types.PROFILE_SUCCESS]: success,
  [Types.PROFILE_FAILURE]: failure
})
