import { addMinutes } from 'date-fns'
function mockSchedule(name, location, dateFrom, dateTo) {
  return { id: name, name, location, dateFrom, dateTo, beaconId: '8F3a' }
}

export default {
  // Functions return fixtures
  getRoot: () => {
    return {
      ok: true,
      data: require('../Fixtures/root.json')
    }
  },
  getRate: () => {
    return {
      ok: true,
      data: require('../Fixtures/rateLimit.json')
    }
  },
  getUser: (username) => {
    // This fixture only supports gantman or else returns skellock
    const gantmanData = require('../Fixtures/gantman.json')
    const skellockData = require('../Fixtures/skellock.json')
    return {
      ok: true,
      data: username.toLowerCase() === 'gantman' ? gantmanData : skellockData
    }
  },
  login: (username, password) => {
    return {
      ok: true,
      data: 'somejwt'
    }
  },
  syncSchedule: (dateFrom, dateTo) => {
    const now = new Date(new Date().setSeconds(0))
    const next = addMinutes(now, 1)
    return {
      ok: true,
      data: [
        { 
          date: dateFrom,
          schedules: [
            mockSchedule("React 101", "Hall 01", addMinutes(next, 0), addMinutes(next, 1)),
            mockSchedule("Calculus 101", "Hall 02", addMinutes(next, 2), addMinutes(next, 4)),
            //mockSchedule("Accounting 101", "Hall 07", addMinutes(next, 5), addMinutes(next, 7)),
            //mockSchedule("Statistic 101", "Hall 09", addMinutes(next, 15), addMinutes(next, 17)),
            mockSchedule("Yoga", "Studio 1", addMinutes(next, 5), addMinutes(next, 7))
          ]
        }
      ]
    }
  }
}
