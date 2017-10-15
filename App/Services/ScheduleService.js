import { isToday, isWithinRange } from 'date-fns'
import { find, sort, dropWhile, map } from 'ramda'

/**
 * Gets the next schedules given the relativeTime.
 * @param {*} schedules The schedules list.
 * @param {*} relativeTime The relative time.
 */
export function nextSchedule (schedules, relativeTime) {
  const allSchedules = map(s => s.schedules, schedules)
  const sorted = sort((a, b) => a.dateFrom - b.dateFrom, allSchedules)
  var next = dropWhile(
    (s) => isBefore(new Date(s.dateFrom), relativeTime) && !isWithinRange(relativeTime, s.dateFrom, s.dateTo),
    sorted)

  return next ? next : undefined
}

/**
 * Gets all schedules for the day.
 * @param {*} schedules The schedule list.
 */
export function todaySchedule (schedules) {
  var today = find(
    (s) => isToday(new Date(s.date)),
    schedules)

  return today ? today : undefined
}