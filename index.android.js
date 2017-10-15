import './App/Config/ReactotronConfig'
import { AppRegistry } from 'react-native'
import App, { onPushRegistered, onNotificationOpened, onNotificationReceived } from './App/Containers/App'
import {NotificationsAndroid, PendingNotifications} from 'react-native-notifications';

function handleOnPushRegistered() {
  if (onPushRegistered) {
    onPushRegistered();
  }
}

function handleOnNotificationOpened(notification) {
  if (onNotificationOpened) {
    onNotificationOpened(notification)
  }
}

function handleOnNotificationReceived(notification) {
  if (onNotificationReceived) {
    onNotificationReceived(notification)
  }
}

// It's highly recommended to keep listeners registration at global scope rather than at screen-scope seeing that
// component mount and unmount lifecycle tend to be asymmetric!
NotificationsAndroid.setRegistrationTokenUpdateListener(handleOnPushRegistered);
NotificationsAndroid.setNotificationOpenedListener(handleOnNotificationOpened);
NotificationsAndroid.setNotificationReceivedListener(handleOnNotificationReceived);

AppRegistry.registerComponent('SmartUniApp', () => App)
