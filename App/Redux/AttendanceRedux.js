import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  attendanceRegister: ['lecture'],
  attendanceFinished: ['lecture']
})

export const AttendanceTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  registering: false,
  attending: null,
  recents: []
})

/* ------------- Reducers ------------- */

/*
* Register attendance
*/
export const register = (state, { lecture }) => {
  return state.merge({ attending: lecture })
}

/*
* Lecture has finished
*/
export const finished = (state, { lecture }) => {
  return state.merge({
    recents: state.recents.concat(lecture),
    attending: null
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ATTENDANCE_REGISTER]: register,
  [Types.ATTENDANCE_FINISHED]: finished
})
