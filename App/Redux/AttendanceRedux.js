import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { mergeWithKey } from 'ramda'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  attendanceArrived: ['schedule'],
  attendanceRegister: ['lecture'],
  attendanceFinished: ['lecture'],
  attendanceProgress: ['status'],
  attendanceNext: ['schedule'],
  attendanceMissed: ['schedule']
})

export const AttendanceTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  registering: false,
  attending: null,
  recents: [],
  arrived: null,
  progress: null,
  next: null
})

/* ------------- Reducers ------------- */

/*
* Register attendance
*/
export const register = (state, { lecture }) => {
  return state.merge({ attending: lecture, arrived: null, next: null })
}

/*
* Lecture has finished
*/
export const finished = (state, { lecture }) => {
  return state.merge({
    recents: state.recents.concat(lecture),
    attending: null,
    progress: null
  })
}
/*
* User has arrived for the class
*/
export const arrived = (state, { schedule }) => {
  const updateTime = (k, l, r) => k == 'time' ? l : r
  const merged = mergeWithKey(
    updateTime,
    state.arrived || {},
    { schedule, time: new Date() })

  return state.merge({
    arrived: merged
  })
}

/*
* Updates attendance progress
*/
export const progress = (state, { status }) => {
  return state.merge({
    progress: status
  })
}

/*
* What to attend next
*/
export const attendNext = (state, { schedule }) => {
  return state.merge({
    next: schedule
  })
}

/*
* Attendance has missed
*/
export const missed = (state, { schedule }) => {
  return state.merge({
    next: null
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ATTENDANCE_REGISTER]: register,
  [Types.ATTENDANCE_FINISHED]: finished,
  [Types.ATTENDANCE_ARRIVED]: arrived,
  [Types.ATTENDANCE_PROGRESS]: progress,
  [Types.ATTENDANCE_NEXT]: attendNext,
  [Types.ATTENDANCE_MISSED]: missed
})
