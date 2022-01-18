import PushNotification, { Importance } from "react-native-push-notification";

export class MyNotification {

  initialize() {
    console.log("Initializing Push Notification");
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: token => {
        console.log("TOKEN:", token);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: notification => {
        console.log("oui");
        console.log("NOTIFICATION:", notification);

        // process the notification

        // (required) Called when a remote is received or opened, or local notification is opened
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: notification => {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);

      },


      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: err => {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
    PushNotification.deleteChannel("laundry");
    PushNotification.createChannel(
      {
        channelId: "laundry",
        channelName: `Laundry`,
        channelDescription: "A default channel",
        playSound: true,
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH,
        priority: "high",
        visibility: "public",
      },
      (created) => console.log(`createChannel 'laundry' returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }
}

const myNotification = new MyNotification();
export default myNotification;
