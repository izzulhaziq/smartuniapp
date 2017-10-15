import { map, reduce, groupBy, compose, mapObjIndexed, values } from 'ramda'
import { getDay } from 'date-fns'
/**
 * Transform response from /api/profiles/full.json to list of schedules
 * @param {*} response 
 */
export const transformSchedule = (response) => {
  const allSchedules = compose(
    (arr) => map(c => { 
      return {
        id: c.id, 
        name: c.name,
        location: c.venue.name,
        beaconId: c.venue.primary_beacon,
        dateFrom: new Date(c.start),
        dateTo: new Date(c.end)}}, arr),
    (arr) => reduce((a, b) => a.concat(b), [], arr),
    (arr) => map(c => c.course_schedules, arr)
  )(response.data.student[0].courses)

  // group by daily
  const groupByDaily = (arr) => groupBy(c => {
    let d = new Date(c.dateFrom)
    return new Date(d.getFullYear(), d.getMonth(), d.getDate())
  }, arr)

  const grouped = compose(
    (g) => values(g),
    (g) => mapObjIndexed((val, key) => { return { date: key, schedules: val }}, g),
    groupByDaily
  )(allSchedules)
  return grouped
}