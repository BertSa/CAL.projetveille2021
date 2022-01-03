import { PushNotification } from "react-native-push-notification";
class Notification {
  constructor() {
    PushNotification.configure({
      onRegister: function(token) {
        console.log("TOKEN:", token);
      },
      onNotification: function(notification) {
        console.log("NOTIFICATION:", notification);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
      popInitialNotification: true,
      requestPermissions: true
    });
    PushNotification.localNotification({
      title: "My Notification Title",
      message: "My Notification Message"
    });
  }

}
