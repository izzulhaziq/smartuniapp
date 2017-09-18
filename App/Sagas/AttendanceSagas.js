import { call, put, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import AttendanceActions from '../Redux/AttendanceRedux'
import { AttendanceTypes } from '../Redux/AttendanceRedux'
import BeaconActions from '../Redux/BeaconRedux'
import { BeaconTypes } from '../Redux/BeaconRedux'
import { isToday, isWithinRange, isBefore } from 'date-fns'
import { find, filter } from 'ramda'
import { Toast } from 'native-base'

function getCurrentSchedule(schedules) {
  const now = new Date()
  const today = find((schedule) => isToday(schedule.date), schedules)

  if (today) {
    const current = find(s => isWithinRange(now, s.dateFrom, s.dateTo), today.schedules)
    return current
  }
}

function notifyAttendance() {
  Toast.show({
    text: 'Your attendance has been captured!',
    position: 'bottom',
    buttonText: 'Okay'
  })
}

function notifyEnded(name) {
  Toast.show({
    text: `${name} has ended!`,
    position: 'bottom',
    buttonText: 'Okay'
  })
}


export function * watchBeaconForArrival(action) {
  const { beacons, namespace } = action;
  const schedule = yield select(state => state.schedule)
  const attendance = yield select(state => state.attendance)

  if (!schedule.success || !isToday(schedule.lastSync) || !schedule.data || attendance.attending) {
    return
  }

  const current = getCurrentSchedule(schedule.data)
  if (!current) {
    return
  }  
  
  const shouldBeacons = filter(b => b.uniqueId === current.beaconId, beacons)
  if (shouldBeacons && shouldBeacons.length > 0) {
    yield put(AttendanceActions.attendanceArrived(current))
  }
}

export function * watchOnArrived(action) {
  const now = new Date()
  const attendance = yield select(state => state.attendance)
  const arrival = attendance.arrived || { time: now };
  const duration = now - arrival.time;

  if (duration > 10000) {
    yield put(AttendanceActions.attendanceRegister(action.schedule))
    yield call(notifyAttendance)
  }
}

export function * watchOnAttending() {  
    const attendance = yield select(state => state.attendance)
    const { attending: schedule } = attendance
    const endTime = schedule.dateTo
    yield put(AttendanceActions.attendanceProgress({ timestamp: new Date() }))

    while (isBefore(new Date(), endTime)) {
      try {
        yield delay(10000)
        yield put(AttendanceActions.attendanceProgress({ timestamp: new Date() }))
      } catch (error) {
        
      }
    }

    yield put(AttendanceActions.attendanceFinished(schedule))
    yield call(notifyEnded, schedule.name)
}
