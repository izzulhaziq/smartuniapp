import Beacons from 'react-native-beacons-manager'
import Kontakt from 'react-native-kontaktio';

const {
  connect,
  configure,
  disconnect,
  isConnected,
  startScanning,
  stopScanning,
  restartScanning,
  isScanning,
  // setBeaconRegion,
  setBeaconRegions,
  getBeaconRegions,
  setEddystoneNamespace,
  IBEACON,
  EDDYSTONE,
  // Configurations
  scanMode,
  scanPeriod,
  activityCheckConfiguration,
  forceScanConfiguration,
  monitoringEnabled,
  monitoringSyncInterval,
} = Kontakt;

const BeaconEvents = {
  EDDYSTONE_APPEAR: 'eddystoneDidAppear',
  EDDYSTONE_DISAPPEAR: 'eddystoneDidDisappear',
  EDDYSTONE_UPDATE: 'eddystonesDidUpdate',
  NAMESPACE_ENTER: 'namespaceDidEnter',
  NAMESPACE_EXIT: 'namespaceDidExit',
  SCAN_STATUS: 'scanStatus',
  MONITORING_CYCLE: 'monitoringCycle'
}

/*
* Connects the Kontakt.io SDK
*/
const connectKontakt = () => {
  connect('MY_KONTAKTIO_API_KEY', [EDDYSTONE])
    .then(() => configure({
      scanMode: scanMode.LOW_LATENCY,
      scanPeriod: scanPeriod.RANGING,
      activityCheckConfiguration: activityCheckConfiguration.DEFAULT,
      forceScanConfiguration: forceScanConfiguration.MINIMAL,
      monitoringEnabled: monitoringEnabled.FALSE,
      monitoringSyncInterval: monitoringSyncInterval.DEFAULT,
    }))
    .then(() => setEddystoneNamespace())
    .catch(error => console.log('error', error))
}

/*
* Starts scanning for beacons
*/
const startRanging = (identifier, uuid) => {
  startScanning()
    .then(() => console.log('started scanning'))
    .catch(error => console.log('[startScanning]', error))
}

/*
* Stops scanning for beacons
*/
const stopRanging = (identifier, uuid) => {
  stopScanning()
    .then(() => console.log('stopped scanning'))
    .catch(error => console.log('[stopScanning]', error))
}

/*
* Disconnects the Kontakt.io SDK
*/
const disconnectKontakt = () => {
  disconnect()
}

export default {
  connectKontakt,
  disconnectKontakt,
  startRanging,
  stopRanging,
  BeaconEvents
}