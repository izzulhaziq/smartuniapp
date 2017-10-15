import { call, put, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import AttendanceActions from '../Redux/AttendanceRedux'
import { AttendanceTypes } from '../Redux/AttendanceRedux'
import BeaconActions from '../Redux/BeaconRedux'
import { BeaconTypes } from '../Redux/BeaconRedux'
import { isToday, isWithinRange, isBefore, isAfter, addSeconds } from 'date-fns'
import { find, filter, sort, dropWhile } from 'ramda'
import { Toast } from 'native-base'
import { NotificationsAndroid } from 'react-native-notifications'

function getCurrentSchedule(schedules) {
  const now = new Date()
  const today = find((schedule) => isToday(schedule.date), schedules)

  if (today) {
    const current = find(s => isWithinRange(now, s.dateFrom, s.dateTo), today.schedules)
    return current
  }
}

function getNextSchedule(schedules) {
  const now = new Date()
  const today = find((schedule) => isToday(schedule.date), schedules)

  if (today) {
    const sorted = sort((a, b) => a.dateFrom - b.dateFrom, today.schedules)
    var next = dropWhile(
      (s) => isBefore(new Date(s.dateFrom), now) && !isWithinRange(now, s.dateFrom, s.dateTo),
      sorted)

    return next ? next[0] : undefined
  } else {
    return undefined
  }
}

function shouldBeAttending(next) {
  const now = new Date()
  return isWithinRange(now, next.dateFrom, next.dateTo) &&
    isAfter(now, addSeconds(next.dateFrom, 30)) 
}

function scheduleHasPassed(schedule) {
  const now = new Date()
  return isAfter(now, schedule.dateTo)
}

function notifyAttendance(name) {
  Toast.show({
    text: 'Your attendance has been captured!',
    position: 'bottom',
    buttonText: 'Okay'
  })

  NotificationsAndroid.localNotification({
    title: name,
    body: 'Your attendance has been captured! Stay in the class and learn young padawan!'
  })
}

function notifyEnded(name) {
  Toast.show({
    text: `${name} has ended!`,
    position: 'bottom',
    buttonText: 'Okay'
  })
}

function notifyShouldAttend(name) {
  NotificationsAndroid.localNotification({
    title: name,
    body: 'Class has started. Attend now.'
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
  const { schedule } = action
  const now = new Date()
  const attendance = yield select(state => state.attendance)
  const arrival = attendance.arrived || { time: now };
  const duration = now - arrival.time;

  if (duration > 10000) {
    yield put(AttendanceActions.attendanceRegister(schedule))
    yield call(notifyAttendance, schedule.name)
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

function * nextSchedule() {
  const schedule = yield select(state => state.schedule)
  const attendance = yield select(state => state.attendance)

  let next = attendance.next
  if (!attendance.next) {
    next = getNextSchedule(schedule.data)
    if (next) {
      yield put(AttendanceActions.attendanceNext(next))
    } 
  }
  
  return next
}

export function * watchNextSchedule() {
  let hasNotifiedToAttend = false
  while (true) {
    try {
      const schedule = yield select(state => state.schedule)
      if (!schedule.data) {
        yield delay(10000)
        continue
      }

      const attendance = yield select(state => state.attendance)
      if (attendance.attending) {
        yield delay(10000)
      }
      
      let next = yield call(nextSchedule)
      if (!next) {
        yield delay(10000)
        continue
      }
      
      if (scheduleHasPassed(next)) {
        yield put(AttendanceActions.attendanceMissed(next))
        yield call(nextSchedule)
      }

      const now = new Date()
      if (shouldBeAttending(next)) {
        if (!attendance.attending && !hasNotifiedToAttend) {
          yield call(notifyShouldAttend, next.name)
          hasNotifiedToAttend = true
        }
      } else {
        hasNotifiedToAttend = false
      }

      yield delay(10000)
    } catch (error) {
      throw error
      //yield delay(10000)
    }
  }
}
