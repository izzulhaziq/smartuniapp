import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['username', 'password'],
  loginSuccess: ['payload'],
  loginFailure: null,
  logoutRequest: null,
  logoutSuccess: null,
  logoutFailure: null
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  username: null,
  fetching: null,
  payload: null,
  error: null,
  hasLoggedIn: null
})

/* ------------- Reducers ------------- */

export const loginRequest = (state, { username, password }) =>
  state.merge({ fetching: true, payload: null, username })

export const loginSuccess = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, hasLoggedIn: true, payload })
}

export const loginFailure = state =>
  state.merge({ fetching: false, error: true, hasLoggedIn: null, payload: null })

export const logoutRequest = state =>
  state.merge({ fetching: true })

export const logoutSuccess = state => 
  state.merge({ fetching: false, error: null, hasLoggedIn: false, username: null })

export const logoutFailure = state =>
  state.merge({ fetching: false, error: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.LOGOUT_REQUEST]: logoutRequest,
  [Types.LOGOUT_SUCCESS]: logoutSuccess,
  [Types.LOGOUT_FAILURE]: logoutFailure
})
