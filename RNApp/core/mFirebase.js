import messaging from "@react-native-firebase/messaging";
import PushNotification, { Importance } from "react-native-push-notification";

export class mFirebase {

  initialize() {
    PushNotification.configure({
      onRegister: function(token) {
        console.debug("TOKEN:", token);
      },
      onNotification: function(notification) {
        console.debug("NOTIFICATION:", notification);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
      popInitialNotification: true,
      requestPermissions: true
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
        badge: true
      }
    );


    messaging().onMessage(async remoteMessage => {
      console.debug("Message handled", remoteMessage);
      const { title, message, channelId } = remoteMessage.data;
      PushNotification.localNotification({
        channelId: channelId,
        title: title,
        message: message
      });
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log("Notification caused app to open from background state:", remoteMessage.data);
      const { title, message, channelId } = remoteMessage.data;
      PushNotification.localNotification({
        channelId: channelId,
        title: title,
        message: message
      });
    });

    this.subscribeToTopic("laundry");
    this.subscribeToTopic("waterleak");

  }

  subscribeToTopic(topic) {
    messaging().unsubscribeFromTopic(topic).then();
    messaging().subscribeToTopic(topic).then(() => console.log(`Subscribed to topic: ${topic}!`));
  }
}

const myFirebase = new mFirebase();
export default myFirebase;
