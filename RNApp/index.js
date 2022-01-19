/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import myFirebase from "./core/mFirebase";
import PushNotification, {Importance} from "react-native-push-notification";

myFirebase.initialize()
PushNotification.configure({
    onRegister: function(token) {
        console.log( 'TOKEN:', token );
    },
    onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );
    },
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },
    popInitialNotification: true,
    requestPermissions: true,
});
PushNotification.createChannel(
    {
        id: "laundry",
        name: "laundry",
        description: "default",
        priority: "high",
        vibrate: true,
        sound: true,
        light: true,
        importance: Importance.HIGH,
        visibility: "public",
        badge: true,

    }
);
AppRegistry.registerComponent(appName, () => App);
