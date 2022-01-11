import messaging from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";

export class MyFirebase {
  lastMessage = null;
  _isInitialized: boolean;

  constructor() {
    this._isInitialized = false;
  }

  initialize() {
    if (this._isInitialized) {
      return;
    }
    this._isInitialized = true;
    messaging().onMessage(async remoteMessage => {
      if (remoteMessage === this.lastMessage && this.lastMessage !== null) {
        return;
      }
      this.lastMessage = remoteMessage;
      console.log("Message handled", remoteMessage);
      PushNotification.localNotification({
        /* Android Only Properties */
        channelId: "default-channel-id", // (optional) Create the channel in user's device
        title: remoteMessage?.data?.title,
        message: remoteMessage?.data?.text,
        data: remoteMessage?.data,
        playSound: true,
        actions: [
          "Yes",
        ],

      });
      console.log("Finished handling message");
    });

    this.subscribeToTopic("laundry");
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log("Message handled in the background!", remoteMessage.data);
      if (remoteMessage === this.lastMessage && this.lastMessage !== null) {
        return;
      }
      this.lastMessage = remoteMessage;
      PushNotification.localNotification({
        /* Android Only Properties */
        channelId: "default-channel-id", // (optional) Create the channel in user's device
        title: remoteMessage?.data?.title,
        message: remoteMessage?.data?.text,
        data: remoteMessage?.data,

      });
    });
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log("Notification caused app to open from background state:", remoteMessage.data);
    });
    // Check whether an initial notification is available
    messaging().getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          "Notification caused app to open from quit state:",
          remoteMessage.data,
        );
      }
    });
  }

  subscribeToTopic(topic) {
    messaging().unsubscribeFromTopic(topic).then();
    messaging().subscribeToTopic(topic).then(() => console.log(`Subscribed to topic ${topic}!`));
  }
}

const myFirebase = new MyFirebase();
export default myFirebase;
