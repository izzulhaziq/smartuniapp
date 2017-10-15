// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import { addMinutes } from 'date-fns'
function mockSchedule(name, location, dateFrom, dateTo) {
  return { id: name, name, location, dateFrom, dateTo, beaconId: '8F3a' }
}

// our "constructor"
const create = (baseURL = 'https://univercity.proxlabs.io/api/') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      'Accept': 'application/json',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxY2QzZDI0Zi1mNDJjLTRiOWMtYjBlMy00OTM5MTBjNDA2MDgiLCJleHAiOjE1MDg2NDk4MDh9.9L7Jes8tdGnNZFv_OfxKYFRkleU0l67TZrQZxKAWgIo'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')
  const getUser = (username) => api.get('search/users', {q: username})
  const login = (username, password) => {
    return api.post('token', { username, password })
  }

  const syncSchedule = (dateFrom, dateTo) => {
    return api.get('profiles/full.json')
  }
  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getRoot,
    getRate,
    getUser,
    login,
    syncSchedule
  }
}

// let's return back our create method as the default.
export default {
  create
}
